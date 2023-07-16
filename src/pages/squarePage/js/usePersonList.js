import { shallowRef } from "vue"

export default () => {
    const persons = shallowRef([])

    const setPerson = (person = []) => {
        persons.value = person
    }

    return {
        persons,
        setPerson
    }
}