type payloadProps = {
  [key: string]: string | number | boolean | Date | File | null | undefined;
};

const cleanupObject = (payloadObj: payloadProps) => {
  Object.keys(payloadObj).forEach((item) => {
    if (
      payloadObj[item] === undefined ||
      payloadObj[item] === null ||
      payloadObj[item] === ""
    ) {
      delete payloadObj[item];
    }
  });
};

export default cleanupObject;
