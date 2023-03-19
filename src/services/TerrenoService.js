import Terreno from '../models/Terreno';

class TerrenoService {

  static async create(newTerreno) {
    try {
      const entityCreated = await Terreno.create(newTerreno);
      return entityCreated;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, terreno) {
    try {
      await Terreno.update(terreno, { where: { id: id } });
      return await this.getById(id);
    } catch (error) {
      throw error; 
    }
  }

  static async getAll(params) {
    const { criterions } = params;

    try {
      const { rows } = await Terreno.findAndCountAll({ ...criterions });
      return { rows, count: rows.length };
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {

    try {
      const terreno = await Terreno.findOne({ where: { id } });
      return terreno;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const rowCount = await Terreno.destroy({
        where: { id }
      });
      return { count: rowCount };
    } catch (error) {
      throw error;
    }
  }

}

export default TerrenoService;
