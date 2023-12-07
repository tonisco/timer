import * as moment from 'moment-timezone';

export const zonesData = moment.tz
  .names()
  .reduce((memo, tz) => {
    memo.push({
      name: tz,
      offset: moment.tz(tz).utcOffset(),
    });

    return memo;
  }, [] as { name: string; offset: number }[])
  .sort((a, b) => {
    return a.offset - b.offset;
  })
  .reduce((memo, tz) => {
    const timezone = moment.tz(tz.name).format('Z');

    memo[`(GMT${timezone}) ${tz.name}`] = tz.name;
    return memo;
  }, {} as { [key: string]: string });

export type ZonesDataType = {
  [key: string]: string;
};
