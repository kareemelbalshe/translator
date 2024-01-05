const countries = {
    "ar-SA": "Arabic",
    "id-ID": "Indonesian",
    "de-DE": "German",
    "it-IT": "Italian",
    "es-ES": "Spanish",
    "ja-JP": "Japanese",
    "en-GB": "English",
}
const fromText = document.querySelector(".from-text")
let toText = document.querySelector(".to-text")
let exchangeIcon = document.querySelector('.change')
let selectTag = document.querySelectorAll('select')
let icon = document.querySelectorAll('.row i')
let translateBtn = document.querySelector('button')
selectTag.forEach((tag, id) => {
    for (let country in countries) {
        let selected = id
        let chose
        selected == 0 ? country == "ar-SA" ? chose="selected" : "" : country == "en-GB" ? chose="selected" : "";
        let option = `<option ${chose} value="${country}">${countries[country]}</option>`;
        tag.insertAdjacentHTML("beforeend", option)
    }
})
exchangeIcon.addEventListener('click', () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value
    toText.value = tempText
    selectTag[0].value = selectTag[1].value
    selectTag[1].value = tempLang
})
fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
        toText.value = ""
    }
})
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim()
    let translateFrom = selectTag[0].value
    let translateTo = selectTag[1].value
    if (!text) return
    toText.setAttribute("placeholder", "Translating...")
    let api = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(api).then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText
            data.matches.forEach(data => {
                if (data.id === 0) {
                    toText.value = data.translation
                }
            })
            toText.setAttribute("placeholder", "Translation")
        })
})