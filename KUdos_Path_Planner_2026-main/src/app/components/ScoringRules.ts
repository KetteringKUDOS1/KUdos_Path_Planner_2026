export type GameMode = 
  | 'Vex_Override_Match' 
  | 'Vex_Override_Skills' 
  | 'RECF_Pinnacle_Match' 
  | 'RECF_Pinnacle_Solo';

export interface RuleConfig {
  name: string;
  isAlliance: boolean;
  cupPoint: number;
  colorPinPoint: number;
  yellowPinPoint: number;
  centerGoalPinPoint: number;
  midfieldPoint: number;
  autonBonusPoint: number;
}

export const SCORING_RULES: Record<GameMode, RuleConfig> = {
  Vex_Override_Match: {
    name: 'VEX Override — Match (2v2)',
    isAlliance: true,
    cupPoint: 0,
    colorPinPoint: 5,
    yellowPinPoint: 10,
    centerGoalPinPoint: 0,
    midfieldPoint: 8,
    autonBonusPoint: 12,
  },
  Vex_Override_Skills: {
    name: 'VEX Override — Skills (Solo)',
    isAlliance: false,
    cupPoint: 0,
    colorPinPoint: 5,
    yellowPinPoint: 10,
    centerGoalPinPoint: 0,
    midfieldPoint: 8,
    autonBonusPoint: 0,
  },
  RECF_Pinnacle_Match: {
    name: 'RECF Pinnacle — Match (2v2)',
    isAlliance: true,
    cupPoint: 1,
    colorPinPoint: 5,
    yellowPinPoint: 5,
    centerGoalPinPoint: 10,
    midfieldPoint: 0,
    autonBonusPoint: 0,
  },
  RECF_Pinnacle_Solo: {
    name: 'RECF Pinnacle — Solo / Skills',
    isAlliance: false,
    cupPoint: 1,
    colorPinPoint: 5,
    yellowPinPoint: 5,
    centerGoalPinPoint: 10,
    midfieldPoint: 0,
    autonBonusPoint: 0,
  },
};
