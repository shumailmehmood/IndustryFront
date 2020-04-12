import { toast } from 'react-toastify';
import _ from 'lodash'
import moment from 'moment';
import { OneDigitNumber, TwoDigitNumber, ThreeDigitNumber } from './constants';
export const SuccessfullToast = (info) => {
    toast.success(info, {
        position: toast.POSITION.TOP_RIGHT
    });
}
export const dateFormat = (inputDate) => {

    return moment(inputDate).format('MMMM Do YY, h:mm:ss a');
}
export const setQuery = () => {

}
export const getQuery = () => {
    var url = window.location.search;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}
export const ErrorToast = (info) => {
    toast.error(info, {
        position: toast.POSITION.TOP_RIGHT
    });
}
export const RemoveInternalSpaces = (sentence) => {
    sentence = sentence.replace(/\s/g, "");
    return sentence[0].toLowerCase() + sentence.slice(1);
}
export const ShuffleArray = (array) => {
    return array.sort(function () {
        return Math.random() - 0.5;
    });

}
const options = (digits, correctOption) => {
    let array = [];
    let option = null;
    array.push(correctOption)
    while (array.length < 4) {
        option = Math.floor(Math.random() * (digits.end - digits.start + 1)) + digits.start;
        if (array.find(element => element === option)) { }
        else array.push(option)
    }
    return array
}
const operations = (first, second, operand) => {
    switch (operand) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '/':
            return first / second;
        case '*':
            return first * second;
        default:
            return "Not allowed"
    }
}
const makeUniqueQuestions = (array, question) => {
    if (array.find(element => element.question === question)) {
        return true
    } else {
        array.push(question)
        return false;
    }
}
const generator = (digits, questions, savedQuestions) => {
    let operandArray = ['+', '-', '/', '*'];
    let array = [], int1, int2, operand, correctOption, question, dbArray = savedQuestions;
    while (array.length < questions) {
        int1 = Math.floor(Math.random() * (digits.end - digits.start + 1)) + digits.start;
        int2 = Math.floor(Math.random() * (digits.end - digits.start + 1)) + digits.start;
        operand = (array.length + 1) % (operandArray.length)
        operand = operandArray[operand];
        correctOption = Math.round(operations(int1, int2, operand) * 10) / 10;
        question = "what is " + int1 + " " + operand + " " + int2
        if ((int1 - int2 < 0) || (int1 < int2) || makeUniqueQuestions(dbArray, question)) { }
        else {
            array.push({
                question: question,
                options: ShuffleArray(options(digits, correctOption)),
                answer: correctOption,
                imageUrl: ''
            })
        }

    }
    return array;
}
export const GenerateAutoMcqs = (digits, questions, savedQuestions) => {
    switch (digits) {
        case 1:
            return generator(OneDigitNumber, questions, savedQuestions);
        case 2:
            return generator(TwoDigitNumber, questions, savedQuestions);
        case 3:
            return generator(ThreeDigitNumber, questions, savedQuestions);
        default:
            return "Not allowed More Than 3 Digits"
    }
}
