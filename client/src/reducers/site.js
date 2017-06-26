const initialState = {
  siteName: ""
};

const SET_SITE_DATA = "SET_SITE_DATA";

export function requestSiteData() {
  return dispatch => {
    fetch("/wp-json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        return dispatch(setSiteData(data));
      })
      .catch(console.log);
  };
}

function setSiteData(data) {
  return {
    type: SET_SITE_DATA,
    payload: data
  };
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_SITE_DATA: {
      return Object.assign({}, state, { siteName: payload.name });
    }
    default: {
      return state;
    }
  }
}
