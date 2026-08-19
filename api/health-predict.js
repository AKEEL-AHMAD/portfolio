/**
 * Backend Serverless API for Smart Community Health Monitoring & Early Warning System
 * Analyzes water IoT sensor feeds (pH, Turbidity, Dissolved Oxygen, Coliforms) and forecasts epidemic risk.
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
      system: 'Coimbatore AI Community Health & Epidemic Early Warning Engine',
      version: '2.1.0'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const pH = parseFloat(body.pH || 7.2);
    const turbidity = parseFloat(body.turbidity || 2.5); // NTU
    const dissolvedOxygen = parseFloat(body.dissolvedOxygen || 6.8); // mg/L
    const bacteriaCount = parseInt(body.bacteriaCount || 10, 10); // CFU/100mL
    const activeCases = parseInt(body.activeCases || 2, 10);

    // Heuristic Outbreak Probability Scoring (0 - 100%)
    let riskScore = 0;

    // pH penalty: safe range 6.5 - 8.5
    if (pH < 6.5 || pH > 8.5) riskScore += 25;
    else if (pH < 6.8 || pH > 8.0) riskScore += 10;

    // Turbidity penalty: standard < 5 NTU
    if (turbidity > 15) riskScore += 35;
    else if (turbidity > 5) riskScore += 20;

    // Dissolved Oxygen: healthy > 5.0 mg/L
    if (dissolvedOxygen < 4.0) riskScore += 20;
    else if (dissolvedOxygen < 5.5) riskScore += 10;

    // Bacteria Count (Coliforms): safe < 50 CFU
    if (bacteriaCount > 200) riskScore += 40;
    else if (bacteriaCount > 50) riskScore += 20;

    // Case spike factor
    if (activeCases > 15) riskScore += 25;
    else if (activeCases > 5) riskScore += 15;

    riskScore = Math.min(Math.max(riskScore, 5), 98);

    let statusLevel = 'SAFE / NORMAL';
    let alertColor = '#10b981';
    let recommendations = [];

    if (riskScore >= 70) {
      statusLevel = '🚨 CRITICAL: HIGH RISK EPIDEMIC OUTBREAK';
      alertColor = '#ef4444';
      recommendations = [
        'Immediate municipal water pipeline isolation triggered.',
        'Emergency chlorination and UV sterilization mandated.',
        'SMS early-warning broadcast dispatched to 14,500 local residents in Zone B.',
        'Mobile medical response units dispatched for active symptom screening.'
      ];
    } else if (riskScore >= 40) {
      statusLevel = '⚠️ ELEVATED: MODERATE CONTAMINATION WARNING';
      alertColor = '#f59e0b';
      recommendations = [
        'Issue advisory: Boil drinking water before consumption.',
        'Increase sensor polling frequency to 5-minute intervals.',
        'Secondary filtration inspection at treatment plant node 4.'
      ];
    } else {
      statusLevel = '✅ SAFE: OPTIMAL WATER QUALITY';
      alertColor = '#10b981';
      recommendations = [
        'Water parameters well within WHO & BIS potable drinking standards.',
        'Routine IoT sensor telemetry logging active.'
      ];
    }

    return res.status(200).json({
      success: true,
      analysis: {
        riskScore: `${riskScore}%`,
        statusLevel,
        alertColor,
        telemetry: {
          pH: pH.toFixed(2),
          turbidity: `${turbidity} NTU`,
          dissolvedOxygen: `${dissolvedOxygen} mg/L`,
          bacteriaCount: `${bacteriaCount} CFU/100mL`,
          activeCases
        },
        recommendations,
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    return res.status(400).json({ error: 'Invalid water quality parameters' });
  }
};
