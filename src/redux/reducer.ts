import { SET_USER_STATE } from "./actions";

export default function reducer(
  state = [],
  { type, payload }: { type: string; payload: any }
):any {
  switch(type){
    case SET_USER_STATE:
      return {
        ...state,
        userData: payload
      }
  }

  return state
}
