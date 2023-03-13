
const initialState = {
  isLoading: false,
  error: null,
  shipments: [],
};

export const LOAD_SHIPMENTS_REQUEST = 'LOAD_SHIPMENTS_REQUEST';
export const LOAD_SHIPMENTS_SUCCESS = 'LOAD_SHIPMENTS_SUCCESS';
export const LOAD_SHIPMENTS_FAILURE = 'LOAD_SHIPMENTS_FAILURE';
export const DELETE_SHIPMENT_REQUEST = 'DELETE_SHIPMENT_REQUEST';
export const DELETE_SHIPMENT_SUCCESS = 'DELETE_SHIPMENT_SUCCESS';
export const DELETE_SHIPMENT_FAILURE = 'DELETE_SHIPMENT_FAILURE';
export const EDIT_SHIPMENT_DETAILS = 'EDIT_SHIPMENT_DETAILS';
export const UPDATE_SHIPMENT = 'UPDATE_SHIPMENT';


export const loadShipments = () => {
  return dispatch => {
    dispatch({ type: LOAD_SHIPMENTS_REQUEST });
    fetch('/shipments.json')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: LOAD_SHIPMENTS_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: LOAD_SHIPMENTS_FAILURE, payload: error.message });
      });
  };
};

export const shipmentDeleted = orderNo => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_SHIPMENT_REQUEST });
    // Make an API call to delete the shipment with the given orderNo
    /* fetch(/shipments/${orderNo}, {
    method: 'DELETE',
    })
    .then((response) => response.json()) */
    Promise.resolve()
      .then(() => {
        const state = getState();
        const filteredShipments = state.shipments.filter(
          shipment => shipment.orderNo !== orderNo
        );
        dispatch({ type: DELETE_SHIPMENT_SUCCESS, payload: filteredShipments });
      }).catch(error => {
        dispatch({ type: DELETE_SHIPMENT_FAILURE, payload: error.message });
      });
  };
};

export const editShipmentDetails = (orderNo, updatedDetails) => {
  return (dispatch, getState) => {
    dispatch({ type: EDIT_SHIPMENT_DETAILS, payload: { orderNo, updatedDetails } });
    const shipments = getState().shipments;
    const index = shipments.findIndex((shipment) => shipment.orderNo === orderNo);
    if (index !== -1) {
      const updatedShipment = {
        ...shipments[index],
        ...updatedDetails,
      };
      shipments[index] = updatedShipment;
      dispatch({ type: UPDATE_SHIPMENT, payload: shipments });

      /* axios.put(`/shipments/${orderNo}`, updatedShipment)
        .then((response) => {
          console.log('updated shipment in the API');
        })
        .catch((error) => {
          dispatch({
            type: LOAD_SHIPMENTS_FAILURE,
            payload: `Failed to update shipment with order number ${orderNo}: ${error.message}`,
          });
        }); */
    } else {
      dispatch({
        type: LOAD_SHIPMENTS_FAILURE,
        payload: `Shipment with order number ${orderNo} not found`,
      });
    }
  };
};

export const shipmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SHIPMENTS_REQUEST:
    case DELETE_SHIPMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case
      LOAD_SHIPMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        shipments: action.payload,
      };
    case LOAD_SHIPMENTS_FAILURE:
    case DELETE_SHIPMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_SHIPMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        shipments: action.payload,
      };
    case EDIT_SHIPMENT_DETAILS:
      return {
        ...state,
        shipments: state.shipments.map((shipment) =>
          shipment.orderNo === action.payload.orderNo
            ? { ...shipment, ...action.payload.updatedDetails }
            : shipment
        ),
      };
    case UPDATE_SHIPMENT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    default:
      return state;
  }
};