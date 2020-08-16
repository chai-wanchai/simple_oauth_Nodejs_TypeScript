export const mapDataPropertiesToDBColumns = (cols: string[], data: any) => {
  let updateData = {};
  for (const key in data) {
    if (cols.includes(key)) {
      updateData[key] = data[key];
    }
  }
  return updateData;
}