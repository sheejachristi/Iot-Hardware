import { mdiPill, mdiFlaskOutline, mdiBed, mdiTextBoxMultipleOutline, mdiHospitalBox, mdiMedicalBag } from '@mdi/js';

const defineInfo = (item) => {

    const dictionary = {
        'Conditions': mdiHospitalBox,
        'Doctor Visits': mdiHospitalBox,
        'Lab Results': mdiFlaskOutline,
        'Procedures': mdiBed,
        'Medications': mdiPill,
        'Prescriptions': mdiPill,
        'Observations': mdiTextBoxMultipleOutline
    }

    let icon = mdiMedicalBag

    if (dictionary[item.iconType]) {
        icon = dictionary[item.iconType]
    }

    return {
        icon
    }

}

export default defineInfo