import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { shipmentDeleted } from "../store/shipmentsSlice";
import "../css/shipments.css"
import BadgeIcon from '@mui/icons-material/Badge';
import { SwapVert } from '@mui/icons-material';
import { CloseOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Shipments() {
    const dispatch = useDispatch();
    const shipments = useSelector((state) => state.shipments);

    const removeFromTable = (orderNo) => {
        dispatch(shipmentDeleted(orderNo));
    };

    return (
        <table className='table'>
            <thead>
                <tr className='bg-gray-100 mt-0'>
                    <th className='text-uppercase letter-spacing-1 text-secondary text-xxs font-weight-bolder opacity-7 ps-4'>orderno</th>
                    <th className='text-uppercase letter-spacing-1 text-secondary text-xxs font-weight-bolder opacity-7 ps-4'>deliverydate</th>
                    <th className='text-uppercase letter-spacing-1 text-secondary text-xxs font-weight-bolder opacity-7 ps-4'><div>customer<SwapVert sx={{ fontSize: 16, opacity: 0.5 }} /></div></th>
                    <th className='text-uppercase letter-spacing-1 text-secondary text-xxs font-weight-bolder opacity-7 ps-4'><div>trackinginfo<SwapVert sx={{ fontSize: 16, opacity: 0.5 }} /></div></th>
                    <th className='text-uppercase letter-spacing-1 text-secondary text-xxs font-weight-bolder opacity-7 ps-4'><div>status<SwapVert sx={{ fontSize: 16, opacity: 0.5 }} /></div></th>
                    <th className='text-uppercase letter-spacing-1 text-secondary text-xxs font-weight-bolder opacity-7 ps-4'><div>consignee<SwapVert sx={{ fontSize: 16, opacity: 0.5 }} /></div></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {shipments && shipments.loading && (
                    <tr>
                        <td>Loading...</td>
                    </tr>
                )}
                {shipments &&
                    shipments.map((shipment, index) => (
                        <tr key={index}>
                            <td className='text-sm text-secondary ps-4'>{shipment.orderNo}</td>
                            <td className='text-sm text-secondary ps-4'>{shipment.date}</td>
                            <td className='text-sm text-secondary ps-4'>{shipment.customer}</td>
                            <td className='text-sm text-secondary ps-4'>{shipment.trackingNo}</td>
                            <td className='text-sm text-secondary ps-4'>{shipment.status}</td>
                            <td className='text-sm text-secondary ps-4'>{shipment.consignee}</td>
                            <td className='d-flex'>
                                <button className="button-badge">
                                    <Link key={shipment.orderNo} to={`/shipment/${shipment.orderNo}`}>
                                        <BadgeIcon style={{ fill: '#fff' }} />
                                    </Link>
                                </button>
                                <button className="button-remove" onClick={() => removeFromTable(shipment.orderNo)}>
                                    <CloseOutlined />
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default Shipments;
