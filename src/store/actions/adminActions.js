import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  delUserService,
  editUserService,
} from "../../services/userService";
import { getTopDoctorService } from "../../services/doctorService";
import { dispatch } from "../../redux";
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
      console.log(res);
      if (res && res.message.errCode === 0) {
        toast.success("Create user succeed!");
        dispatch(saveUserSucceed());
        dispatch(fetchAllUserStart());
      } else {
        toast.error(res.message.errMessage);
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log("Fetch error", error);
    }
  };
};

export const saveUserSucceed = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        console.log(res.users);
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

export const delUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await delUserService(userId);
      if (res && res.message.errCode === 0) {
        toast.success("delete the user succeed!");
        dispatch(delUserSucceed());
        dispatch(fetchAllUserStart());
      }
    } catch (error) {
      toast.error("delete the user failed!");
      dispatch(delUserFail());
      console.log("Fetch error", error);
    }
  };
};

export const delUserSucceed = () => ({
  type: actionTypes.DELETE_USER_SUCCEED,
});

export const delUserFail = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

//edit
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await editUserService(data);
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success("Edit user succeed!");
        dispatch(editUserSucceed());
        dispatch(fetchAllUserStart());
      } else {
        toast.error(res.errMessage);
        dispatch(editUserFailed());
      }
    } catch (error) {
      dispatch(editUserFailed());
      console.log("Fetch error", error);
    }
  };
};

export const editUserSucceed = () => ({
  type: actionTypes.EDIT_USER_SUCCEED,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCEED,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }

      // dispatch({ type: actionTypes.FETCH_GENDER_START });
    } catch (error) {
      console.log("error from adminAction fetch doctor ", error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
    }
  };
};
