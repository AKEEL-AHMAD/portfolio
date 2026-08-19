/**
 * Backend Serverless API for SIH 2025 Gold Assay System
 * Simulates ESP32 & Arduino UNO sensor fusion: Hydrostatic Archimedes density + Eddy Current electromagnetic response.
 */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      system: 'SIH 2025 ESP32 Gold Fire Assay Alternative Telemetry Engine',
      host: 'IIT Kharagpur Finalist Prototype'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const weightAir = parseFloat(body.weightAir || 20.0); // Grams
    const weightWater = parseFloat(body.weightWater || 18.96); // Grams
    const eddyFrequency = parseFloat(body.eddyFrequency || 100); // kHz

    // 1. Hydrostatic Archimedes Density: rho = M_air / (M_air - M_water)
    const volume = Math.max(weightAir - weightWater, 0.001);
    const density = weightAir / volume; // g/cm^3

    // Pure 24K Gold Density = 19.32 g/cm3
    // Standard 22K Gold Density = ~17.70 - 17.80 g/cm3
    // Standard 18K Gold Density = ~15.20 - 15.50 g/cm3
    // Tungsten Density = 19.25 g/cm3 (Tricky fake gold!)

    let estimatedKarat = 0;
    let purityPercentage = 0;
    let classification = 'Unknown Sample';
    let tamperDetected = false;
    let notes = '';

    if (density >= 19.1) {
      // Check for Tungsten Counterfeit via Eddy Current Conductivity
      // Gold Electrical Conductivity: ~45 MS/m vs Tungsten: ~18 MS/m
      if (eddyFrequency < 80) {
        tamperDetected = true;
        classification = '⚠️ COUNTERFEIT DETECTED: Tungsten Core with Gold Plating';
        estimatedKarat = 0;
        purityPercentage = 12.5;
        notes = 'Density matches gold, but Eddy Current electromagnetic response reveals non-conductive tungsten core.';
      } else {
        estimatedKarat = 24;
        purityPercentage = Math.min((density / 19.32) * 100, 99.99);
        classification = '24K Fine Pure Gold (99.9% Purity)';
        notes = 'Meets BIS Hallmarking standards for investment grade bullion.';
      }
    } else if (density >= 17.3 && density < 19.1) {
      estimatedKarat = 22;
      purityPercentage = (density / 19.32) * 100;
      classification = '22K Jewellery Gold (91.6% Purity)';
      notes = 'Standard BIS 916 hallmarked jewellery alloy (Gold + Copper/Silver blend).';
    } else if (density >= 15.0 && density < 17.3) {
      estimatedKarat = 18;
      purityPercentage = (density / 19.32) * 100;
      classification = '18K Diamond Jewellery Gold (75.0% Purity)';
      notes = 'Standard 750 gold alloy used in stone-studded jewellery.';
    } else {
      estimatedKarat = Math.max(Math.round((density / 19.32) * 24), 0);
      purityPercentage = Math.max((density / 19.32) * 100, 0);
      classification = 'Low-Purity Alloy / Base Metal';
      notes = 'Sample does not meet hallmarking purity standards.';
    }

    return res.status(200).json({
      success: true,
      telemetry: {
        weightAir: `${weightAir.toFixed(3)} g`,
        weightWater: `${weightWater.toFixed(3)} g`,
        calculatedDensity: `${density.toFixed(2)} g/cm³`,
        eddyCurrentFreq: `${eddyFrequency} kHz`,
        purityPercentage: `${purityPercentage.toFixed(2)}%`,
        estimatedKarat: `${estimatedKarat}K`,
        classification,
        tamperDetected,
        notes,
        testedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    return res.status(400).json({ error: 'Invalid assay parameters' });
  }
};
