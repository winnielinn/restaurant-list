function sortFilter(filter) {
  const sortData = {
    NAME_ASC: 'A-Z',
    NAME_EN_DESC: 'Z-A',
    CATEGORY_ASC: 'category',
    LOCATION_ASC: 'location',
  }

  switch (filter) {
    case sortData.NAME_ASC: {
      return { name: 'asc' }
      break
    }
    case sortData.NAME_EN_DESC: {
      return { name_en: 'desc' }
      break
    }
    case sortData.CATEGORY_ASC: {
      return { category: 'asc' }
      break
    }
    case sortData.LOCATION_ASC: {
      return { location: 'asc' }
      break
    }
  }
}


module.exports = sortFilter