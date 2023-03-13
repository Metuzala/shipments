import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editShipmentDetails } from '../store/shipmentsSlice';

const ShipmentsDetails = () => {
  const { orderNo } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shipment = useSelector(state => state.shipments.find(shipment => shipment.orderNo === orderNo));

  const [customer, setCustomer] = useState(shipment?.customer ?? '');
  const [consignee, setConsignee] = useState(shipment?.consignee ?? '');
  const [date, setDate] = useState(shipment?.date ?? '');
  const [trackingNo, setTrackingNo] = useState(shipment?.trackingNo ?? '');
  const [status, setStatus] = useState(shipment?.status ?? '');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!shipment) return;
    const updatedDetails = { customer, consignee, date, trackingNo, status };
    dispatch(editShipmentDetails(orderNo, updatedDetails));
    navigate('/shipments');
  };


  return (
    <div>
      {!shipment ? (
        <div>Loading...</div>
      ) : (
        <div className="position-relative">
          <div className="card-header bg-gradient-info pt-8 position-relative z-index-9"></div>
          <div className="card col-11 p-4" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '-60px' }}>
            <hr />
            <div>
              <p className='text-secondary text-uppercase '>shipment details</p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="col-6 p-2">
                <div className="input-group input-group-outline mb-3">
                  <label className="text-secondary text-sm font-weight-bold letter-spacing-1">OrderNo</label>
                  <input type="text" style={{ background: "#eeeeee" }} defaultValue={shipment.orderNo} className="form-control" readOnly />
                </div>
                <div className="input-group input-group-outline mb-3">
                  <label className="text-secondary text-sm font-weight-bold letter-spacing-1">customer</label>
                  <input type="text" style={{ background: "#eeeeee" }} value={customer} onChange={(event) => setCustomer(event.target.value)} className="form-control" />
                </div>
                <div className="input-group input-group-outline mb-3">
                  <label className="text-secondary text-sm font-weight-bold letter-spacing-1">consignee</label>
                  <input type="text" style={{ background: "#eeeeee" }} value={consignee} onChange={(event) => setConsignee(event.target.value)} className="form-control" />
                </div>
                <br />
              </div>
              <div className="col-6 p-2">
                <div className="input-group input-group-outline mb-3">
                  <label className="text-secondary text-sm font-weight-bold letter-spacing-1">date</label>
                  <input type="text" style={{ background: "#eeeeee" }} value={date} onChange={(event) => setDate(event.target.value)} className="form-control" />
                </div>
                <div className="input-group input-group-outline mb-3">
                  <label className="text-secondary text-sm font-weight-bold letter-spacing-1">trackingNo</label>
                  <input type="text" style={{ background: "#eeeeee" }} value={trackingNo} onChange={(event) => setTrackingNo(event.target.value)} className="form-control" />
                </div>
                <div className="input-group input-group-outline mb-3">
                  <label className="text-secondary text-sm font-weight-bold letter-spacing-1">status</label>
                  <input type="text" style={{ background: "#eeeeee" }} value={status} onChange={(event) => setStatus(event.target.value)} className="form-control" />
                </div>
              </div>
            </form>
            <div className="col-12 p-2">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentsDetails;
