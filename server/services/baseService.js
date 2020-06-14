/**
 * @class BaseService
 */
export default class BaseService {
  /**
   * @method constructor
   * @param {object} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @method create
   * @description
   * @param {object} dataObject
   * @returns {object} created object
   */
  async create(dataObject) {
    const data = this.model.create(dataObject);
    return data;
  }

  /**
   * @method find
   * @param {object} missingObject
   * @returns {object} found object
   */
  async find(missingObject) {
    const found = this.model.findOne(missingObject);
    return found;
  }

  /**
   * @method delete
   * @param {object} dataObject
   * @returns {object} result
   */
  async delete(dataObject) {
    const result = this.model.deleteOne(dataObject);
    return result;
  }

  /**
   * @method findOne
   * @param {object} missingObject
   *  @param {object} indexObject
   * @returns {object} found object
   */
  async findOne(missingObject, indexObject) {
    const found = this.model.findOne(missingObject).select(indexObject);
    return found;
  }

  /**
   * @method findOneAndPopulate
   * @param {object} whereObject
   * @param {object} dataObject
   * @returns {object} found object
   */
  async findOneAndPopulate(whereObject, dataObject) {
    const found = this.model
      .findOne(whereObject)
      .populate(dataObject)
      .exec();
    return found;
  }

  /**
   * @method deleteOne
   * @param {object} dataObject
   * @returns {object} result
   */
  async deleteOne(dataObject) {
    const result = this.model.deleteOne(dataObject);
    return result;
  }

  /**
   * @method findAll
   * @param {object} emptyObject
   * @returns {Array} result
   */
  async findAll(emptyObject) {
    const result = this.model.find(emptyObject);

    return result;
  }

  /**
   * @method update
   * @param {*} whereObject
   * @param {*} dataObject
   * @returns {object} updated row
   */
  async findOneAndUpdate(whereObject, dataObject) {
    const data = await this.model.findOneAndUpdate(whereObject, dataObject, {
      new: true,
    });
    return data;
  }

  /**
   * @method updateMany
   * @param {*} whereObject
   * @param {*} dataObject
   * @returns {object} updated row
   */
  async findAndUpdateMany(whereObject, dataObject) {
    const data = await this.model.updateMany(whereObject, dataObject, {
      new: true,
    });
    return data;
  }

  /**
   * @method sumWithConditions
   * @param {*} whereObject
   * @param {*} dataObject
   * @returns {object} updated row
   */
  async sumWithConditions(whereObject, dataObject) {
    const data = await this.model.updateMany(whereObject, dataObject, {
      new: true,
    });
    return data;
  }
}
