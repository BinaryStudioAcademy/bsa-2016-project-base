
import MultiSelect from "./../components/MultiSelect"
import RangeDateSelect from "./../components/RangeDateSelect"
const data = {
    "MultiSelect":MultiSelect,
    "RangeDateSelect":RangeDateSelect
};
export default function map(className) {
    return data[className];
}