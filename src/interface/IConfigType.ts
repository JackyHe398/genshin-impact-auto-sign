export interface IConfigType {
  lastDate: Date;
  signTime: {
    hours: number;
    minutes: number;
  };
  open: boolean;
}

export type SignInfo = {
  /**
   * 登入狀態
   * 
   * need to state clearly that, message is not under resignInfo.data as other fields do.
   * It is a top-level field in the response object,
   * means it should be access by resignInfo.message
   * instead of resignInfo.data.message
   * 
   * known values:
   * - "OK"
   * - "Not logged in"
   */
  message: string;

  /**
   * ??
   */
  cost: number;

  /**
   * 每月已領補簽卡數量
   */
  monthQualityCnt: number;

  /**
   * 補簽卡數量
   */
  qualityCnt: number;

  /**
   * 今天補簽數量
   */
  resignCntDaily: number;

  /**
   * 目前月份補簽數量
   */
  resignCntMonthly: number;

  /**
   * 每天補簽上限
   */
  resignLimitDaily: number;

  /**
   * 每月補簽上限
   */
  resignLimitMonthly: number;

  /**
   * 簽到總天數
   */
  signCnt: number;

  /**
   * 漏簽總天數
   */
  signCntMissed: number;

  /**
   * 今天是否簽到
   */
  signed: boolean;
} | null;
