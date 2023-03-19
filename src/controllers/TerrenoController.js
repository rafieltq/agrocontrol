import TerrenoService from '../services/TerrenoService';
import Response from '../utils/response';
import querystringConverterHelper from '../utils/querystringConverterHelper';

class TerrenoController {
  static async create(req, res) { 
    const newTerreno = req.body;
    try {
      const entityCreated = await TerrenoService.create(newTerreno);
      return res.json(Response.get('Terreno created', entityCreated));
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
      const { rows, count, total } = await TerrenoService.getAll({
        criterions: {
          where,
          limit,
          offset,
          order,
        }
      });

      return res.json(Response.get('Terreno list', rows, 200, { count, total, offset }));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }


  static async getById(req, res) {
    try {
      const terreno = await TerrenoService.getById(req.params.id);

      if (terreno) {
        return res.json(Response.get('Terreno found', terreno));
      }
      return res.json(Response.get('Terreno not found', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const terreno = req.body;

    try {
      const updateTerreno = await TerrenoService.update(id, terreno);

      return res.json(Response.get('Terreno Updated', updateTerreno));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async delete(req, res) {
    try {
      await TerrenoService.delete(req.params.id);
      return res.json(Response.get('Terreno deleted', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }
}

export default TerrenoController;
