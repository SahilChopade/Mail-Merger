function getRequiredDataFromSheets(rowData) {
  let companyIndex = -1,
    emailIndex = -1
  rowData[0].values.length >= 2 &&
    rowData[0].values.map((rowItem, idx) => {
      if (rowItem.userEnteredValue.stringValue.toLocaleLowerCase() === "Company".toLocaleLowerCase()) {
        companyIndex = idx
      }
      if (rowItem.userEnteredValue.stringValue.toLocaleLowerCase() === "email".toLocaleLowerCase()) {
        emailIndex = idx
      }
    })
  if (companyIndex === -1 || emailIndex === -1) {
    return { succcess: false, message: "Please Add Minimal Required Data in Sheet" }
  }
  const requiredData = rowData
    .map((rowItem, idx) => {
      if (idx !== 0) {
        return { companyName: rowItem?.values[companyIndex]?.userEnteredValue?.stringValue || null, email: rowItem?.values[emailIndex]?.userEnteredValue?.stringValue || null }
      }
      return null
    })
    .filter((item) => item !== null && item.companyName !== null && item.email !== null)
  return { success: true, data: requiredData }
}

module.exports = { getRequiredDataFromSheets }
