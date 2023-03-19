import Manager from '../models/Manager';

class ManagerService {

  static async create(newManager) {
    try {
      const entityCreated = await Manager.create(newManager);
      return entityCreated;
    } catch (error) {
      throw error;  
    }
  }

  static async update(id, manager) {
    try {
      await Manager.update(manager, { where: { id: id } });
      return await this.getById(id);
    } catch (error) {
      throw error;
    }
  }

  static async getAll(params) {
    const { criterions } = params;

    try {
      const { rows } = await Manager.findAndCountAll({ ...criterions });
      return { rows, count: rows.length };
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {

    try {
      const manager = await Manager.findOne({ where: { id } });
      return manager;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const rowCount = await Manager.destroy({
        where: { id }
      });
      return { count: rowCount };
    } catch (error) {
      throw error;
    }
  }

}

export default ManagerService;
