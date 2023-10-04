function isikukood(kood){
    const months = {
        "01":"jaanuaril",
        "02":"veebruaril",
        "03":"martsil",
        "04":"aprillil",
        "05":"mail",
        "06":"juunil",
        "07":"juulil",
        "08":"augustil",
        "09":"septembril",
        "10":"oktoobril",
        "11":"novembril",
        "12":"detsembril"
    }
    const hospitals = {
        "001": "Kuressaare haiglas",
        "011": "Tartu ülikooli naistekliinikus",
        "021": "Ida-Tallinna keskhaiglas",
        "151": "Keila haiglas",
        "161":"Rapla haiglas, Loksa haiglas, Hiiumaa haiglas (Kärdla)",
        "221":"Ida-Viru keskhaiglas (Kohtla-Järva, endine Jõhvi)",
        "271":"Maarjamõisa kliinikumis (Tartu), Jõgeva haigla",
        "371":"Narva haiglas",
        "421":"Pärnu haiglas",
        "471":"Haapsalu hailgas",
        "491":"Järvamaa haiglas (Paide)",
        "521":"Rakvere haiglas, Tapa haiglas",
        "571":"Valga haiglas",
        "601":"Viljandi haiglas",
        "651":"Lõuna-Eesti haiglas (Võru), Põlva haiglas"
    }
    function getHospitalAndQ(kood){
        const ans = {
            hospital : "",
            queue : 0
        }
        const resource = kood.slice(7, 10)
        if(resource[0] == "0"){
            resource = resource.slice(1)
        }
        temp = Object.keys(hospitals)
        if(parseInt(resource) > 651){
            // return hospitals["700"]
            ans.hospital = hospitals["651"]
            ans.queue = parseInt(resource) - 651
            return ans
        }
        for(let i = 0; i < temp.length; i++){
            if(parseInt(resource) >= temp[i] & parseInt(resource) < temp[i+1]){
                // return [hospitals[temp[i]], resource - temp[i]]
                ans.hospital = hospitals[temp[i]]
                ans.queue = parseInt(resource) - temp[i] + 1
                return ans
            }

        }

    }
    
    function getCentury(num){
        num = parseInt(num)
        const century = {
            2 : 18,
            4 : 19,
            6 : 20,
            8 : 21
        }
        if(num % 2 == 0){
            return century[num]
        }return century[num + 1]
    }
    // Leiab isikukoodi esimese numbri (sugu) kasutades century võtit, kui maksimumarvu selle sajandi jaoks 
    const ControlNumber = (code) => {
        const weight1 = [1,2,3,4,5,6,7,8,9,1]
        const weight2 = [3,4,5,6,7,8,9,1,2,3]

        // 49403136526

        let sum = 0
        for(let i = 0; i < code.length - 1; i++){
            sum = sum + parseInt(code[i]) * weight1[i]
        }
        if(sum % 11 < 10){
            return sum % 11
        }
        else{
            let sum2 = 0
            for(let i = 0; i < code.length -1; i++){
                sum2 = sum2 + parseInt(code[i]) * weight2[i]
            }
            if(sum2 % 11 < 10){
                return sum2 % 11
            }
            else{
                return 0
            }
        }

    }
    const hospitalAndQ = getHospitalAndQ(kood)
    const tempData = {
        sex : kood[0] % 2 == 0 ? "naine": "mees"
    } 
    const ans = {
        kood: kood,
        sex: tempData.sex,
        päev: kood.slice(5,7),
        kuu: months[kood.slice(3,5)],
        sajand: getCentury(kood[0]),
        aasta: kood.slice(1,3),
        haigla: hospitalAndQ.hospital,
        queue: hospitalAndQ.queue,
        cNum: ControlNumber(kood)
    }
    return ans
}

module.exports = {
    isikukood
}