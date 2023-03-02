import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
} from "../../services/userService";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let resGender = await getAllCodeService("gender");
      resGender = resGender.data;
      if (resGender && resGender.errCode === 0) {
        dispatch(fetchGenderSuccess(resGender.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log("Fetch error", error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });

      let resRole = await getAllCodeService("ROLE");
      resRole = resRole.data;
      if (resRole && resRole.errCode === 0) {
        dispatch(fetchRoleSuccess(resRole.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log("Fetch error", error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPosStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let resPos = await getAllCodeService("POSITION");
      resPos = resPos.data;
      if (resPos && resPos.errCode === 0) {
        dispatch(fetchPosSuccess(resPos.data));
      } else {
        dispatch(fetchPosFailed());
      }
    } catch (error) {
      dispatch(fetchPosFailed());
      console.log("Fetch error", error);
    }
  };
};

export const fetchPosSuccess = (posData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: posData,
});

export const fetchPosFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await createNewUserService(data);
      if (res && res.message.errCode === 0) {
        toast.success("MY SUCCESS");
        saveUserSucceed();
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log("Fetch error", error);
    }
  };
};

export const saveUserSucceed = () => ({
  type: "CREATE_USER_SUCCESS",
});

export const saveUserFailed = () => ({
  type: "CREATE_USER_FAILED",
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
      console.log("Fetch error", error);
    }
  };
};

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCEED,
  userAction: data,
});
