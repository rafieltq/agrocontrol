import MeasureService from '../services/MeasureService';
import Response from '../utils/response';
import querystringConverterHelper from '../utils/querystringConverterHelper';

class MeasureController {

  static async create(req, res) {
    const newMeasure = req.body;
    try {
      const entityCreated = await MeasureService.create(newMeasure);
      return res.json(Response.get('Measure created', entityCreated));
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
      const { rows, count, total } = await MeasureService.getAll({
        criterions: {
          where,
          limit,
          offset,
          order,
        }
      });

      return res.json(Response.get('Measure list', rows, 200, { count, total, offset }));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }


  static async getById(req, res) {
    try {
      const measure = await MeasureService.getById(req.params.id);

      if (measure) {
        return res.json(Response.get('Measure found', measure));
      }
      return res.json(Response.get('Measure not found', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const measure = req.body;

    try {
      const updateMeasure = await MeasureService.update(id, measure);

      return res.json(Response.get('Measure Updated', updateMeasure));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }

  static async delete(req, res) {
    try {
      await MeasureService.delete(req.params.id);
      return res.json(Response.get('Measure deleted', {}));
    } catch (error) {
      return res.json(Response.get('Something goes wrong', error, 500));
    }
  }
}

export default MeasureController;
