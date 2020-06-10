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
     * @method findAll
     * @param {object} emptyObject
     * @returns {Array} result
     */
    async findAll(emptyObject) {
      const result = this.model
        .find(emptyObject)
        .populate('userId', ['name'])
        .exec();
      return result;
    }
  }
  