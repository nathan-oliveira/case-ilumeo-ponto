import { RecordTypeEnum } from 'src/modules/points/enums/record-type.enum';

export const createMatrixAndCalculateWorkingHours = async (
  records: Array<any>,
  ignoreLastInfo = false,
) => {
  const matrixRecords = records.reduce((acc, item, index) => {
    if (index % 2 === 0) acc.push([item]);
    else acc[acc.length - 1].push(item);
    return acc;
  }, []);

  let lastRecordType = RecordTypeEnum.EXIT.toString();

  const diffInSecondsOfRecords = matrixRecords.map(
    (completedRecords, index) => {
      if (!ignoreLastInfo && index + 1 === matrixRecords.length) {
        lastRecordType =
          completedRecords[1]?.recordType ||
          RecordTypeEnum.PROHIBITED.toString();
      }

      const firstDate = new Date(completedRecords[0].registrationDate);
      const secondDate = new Date(
        completedRecords[1]?.registrationDate || new Date(),
      );

      const diffInMs: number = secondDate.getTime() - firstDate.getTime();
      const diffInSeconds: number = diffInMs / 1000;
      return diffInSeconds;
    },
  );

  const totalSeconds = diffInSecondsOfRecords.reduce(
    (sum, value) => sum + value,
    0,
  );

  const result = {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: Math.floor(totalSeconds % 60),
  };

  if (!ignoreLastInfo) result['lastRecordType'] = lastRecordType;
  return result;
};
