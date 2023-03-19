import Measures from '../models/Measure';

class MeasuresService {

  static async create(newMeasures) {
    try {
      const entityCreated = await Measures.create(newMeasures);
      return entityCreated;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, measures) {
    try {
      await Measures.update(measures, { where: { id: id } });
      return await this.getById(id);
    } catch (error) {
      throw error;
    }
  }

  static async getAll(params) {
    const { criterions } = params;

    try {
      const { rows } = await Measures.findAndCountAll({ ...criterions });
      return { rows, count: rows.length };
    } catch (error) {
        throw error;
    }
  }

}

export default MeasuresService;
