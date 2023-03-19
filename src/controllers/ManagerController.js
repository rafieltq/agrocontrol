import ManagerService from '../services/ManagerService';
import Response from '../utils/response';
import querystringConverterHelper from '../utils/querystringConverterHelper';

class ManagerController {

  static async create(req, res) {
    const newManager = req.body;
    try {
      const entityCreated = await ManagerService.create(newManager);
      return res.json(Response.get('Manager created', entityCreated));
    } catch (error) {
      res.status(500).json({
        message: 'Something goes wrong',
        data: error
      });
    }
  }

  static async getAll(req, res) {
    const { query } = req;

    let { where, limit, offset, order } = querystringConverterHelper.parseQuery(query);

    try {
      const { rows, count, total } = await ManagerService.getAll({
        criterions: {
          where,
          limit,
          offset,
          order,
        }
      });

      return res.json(Response.get('Manager list', rows, 200, { count, total, offset }));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }


  static async getById(req, res) {
    try {
      const manager = await ManagerService.getById(req.params.id);

      if (manager) {
        return res.json(Response.get('Manager found', manager));
      }
      return res.json(Response.get('Manager not found', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const manager = req.body;

    try {
      const updateManager = await ManagerService.update(id, manager);

      return res.json(Response.get('Manager Updated', updateManager));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async delete(req, res) {
    try {
      await ManagerService.delete(req.params.id);
      return res.json(Response.get('Manager deleted', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }
}

export default ManagerController;
