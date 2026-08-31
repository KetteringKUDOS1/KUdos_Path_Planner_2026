import React, { useState } from 'react';
import { SCORING_RULES, GameMode } from './ScoringRules';

export const ScoreCalculator: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('Vex_Override_Match');
  
  // Scoring States
  const [colorPins, setColorPins] = useState<number>(0);
  const [yellowPins, setYellowPins] = useState<number>(0);
  const [cups, setCups] = useState<number>(0);
  const [centerGoalPins, setCenterGoalPins] = useState<number>(0);
  const [inMidfield, setInMidfield] = useState<boolean>(false);
  const [autonBonus, setAutonBonus] = useState<boolean>(false);

  const currentRule = SCORING_RULES[mode];

  // Dynamic Total Score
  const totalScore = 
    (colorPins * currentRule.colorPinPoint) +
    (yellowPins * currentRule.yellowPinPoint) +
    (cups * currentRule.cupPoint) +
    (centerGoalPins * currentRule.centerGoalPinPoint) +
    (inMidfield ? currentRule.midfieldPoint : 0) +
    (autonBonus ? currentRule.autonBonusPoint : 0);

  const resetScores = () => {
    setColorPins(0);
    setYellowPins(0);
    setCups(0);
    setCenterGoalPins(0);
    setInMidfield(false);
    setAutonBonus(false);
  };

  const isOverride = mode.startsWith('Vex_Override');

  return (
    <div style={{
      width: '300px',
      background: '#1e1e1e',
      color: '#ffffff',
      padding: '16px',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      border: '1px solid #333'
    }}>
      {/* Header & Reset */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', color: '#4ec9b0' }}>Score Calculator</h3>
        <button 
          onClick={resetScores}
          style={{ background: '#e51400', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}
        >
          Reset
        </button>
      </div>

      {/* Mode Selector */}
      <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Mode Preset:</label>
      <select 
        value={mode} 
        onChange={(e) => { setMode(e.target.value as GameMode); resetScores(); }}
        style={{ width: '100%', padding: '6px', background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: '4px', marginBottom: '16px' }}
      >
        {Object.entries(SCORING_RULES).map(([key, rule]) => (
          <option key={key} value={key}>{rule.name}</option>
        ))}
      </select>

      {/* Score Tally Display */}
      <div style={{ textAlign: 'center', background: '#252526', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', color: '#888' }}>
          {currentRule.isAlliance ? 'MATCH SCORE' : 'SOLO / SKILLS SCORE'}
        </span>
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#007acc' }}>{totalScore}</div>
      </div>

      {/* Dynamic Counter Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Counter label="Color Pins (5pt)" value={colorPins} onChange={setColorPins} />
        <Counter label="Yellow Pins (10pt)" value={yellowPins} onChange={setYellowPins} />
        
        {!isOverride && (
          <>
            <Counter label="Scored Cups (1pt)" value={cups} onChange={setCups} />
            <Counter label="Center Goal Pins (10pt)" value={centerGoalPins} onChange={setCenterGoalPins} />
          </>
        )}

        {isOverride && (
          <div style={{ marginTop: '8px', borderTop: '1px solid #333', paddingTop: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', marginBottom: '4px' }}>
              <input type="checkbox" checked={inMidfield} onChange={(e) => setInMidfield(e.target.checked)} />
              Robot in Midfield (+8 pts)
            </label>
            {currentRule.isAlliance && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="checkbox" checked={autonBonus} onChange={(e) => setAutonBonus(e.target.checked)} />
                Autonomous Bonus (+12 pts)
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Counter: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({ label, value, onChange }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: '13px' }}>{label}</span>
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <button onClick={() => onChange(Math.max(0, value - 1))} style={btnStyle}>-</button>
      <span style={{ width: '18px', textAlign: 'center', fontWeight: 'bold' }}>{value}</span>
      <button onClick={() => onChange(value + 1)} style={btnStyle}>+</button>
    </div>
  </div>
);

const btnStyle = { width: '24px', height: '24px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
