import * as API from "../../api/api";
export const create_quiz = (data) => {  
    return (dispatch) => {
        try {
            let response = API.createQuiz(data);
            return response
        } catch (err) {
            return err
        }
    };
}
export const remove_question = (data) => {  
    return (dispatch) => {
        try {
            let response = API.removeQuiz(data);
            return response
        } catch (err) {
            return err
        }
    };
}
// export const create_quiz = (data) => {  
//     return (dispatch) => {
//         try {
//             let response = API.viewQuiz(data);
//             return response
//         } catch (err) {
//             return err
//         }
//     };
// }