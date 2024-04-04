export class APIFeatures {
  mongooseQuery: any;
  queryString: any;
  metadata: any;

  constructor(mongooseQuery: any, queryString: any) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
    this.metadata = null;
  }

  filter() {
    // 1) Filtering
    const queryObj = { ...this.queryString };

    // 把regex_field=value替换成{ field: { $regex: 基于value的正则表达式 }
    Object.entries(queryObj).forEach(([key, value]) => {
      if (key.startsWith('regex')) {
        queryObj[key.slice(key.indexOf('_') + 1)] = {$regex: new RegExp((value as string).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi')};
        delete queryObj[key];
      }
    });

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((fields) => {
      delete queryObj[fields];
    });

    //2) Advanced filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    this.mongooseQuery = this.mongooseQuery.find(queryObj);
    this.metadata = this.mongooseQuery.clone().countDocuments();
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // console.log(sortBy);
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-created');
    }

    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');

      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }

    return this;
  }

  pagination() {
    // get the page and convert it to a number. If no page set default to 1
    const page = this.queryString.page * 1 || 1;

    // get limit and if no limit, set limit to 100
    const limit = this.queryString.limit * 1 || 100;

    // calculate skip value
    const skip = (page - 1) * limit;

    // chain it to the mongoose query.
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    // return the object
    return this;
  }
}