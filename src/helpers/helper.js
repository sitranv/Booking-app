const helper = () => {
    return {
        formatPrice : (price) => {
            let priceString = ""
            while (price > 999) {
                var num = price % 1000;
                if (num < 10) {
                    num = '00' + num
                } else if (num < 100) {
                    num = '0' + num;
                }
                priceString = '.' + num + priceString;
                price = Math.floor(price/ 1000);
                if (price <= 999) {
                    priceString = price + '' + priceString;
                    break;
                }
            }
            return priceString;
        },

        formatDate : (date) => {
            return new Date(date).toJSON().slice(0,10).split('-').reverse().join('/')
        }
    }

}
// const formatPrice = (price) => {
//
// }
//
// const formatDate = (date) => {
// }

export default helper;

// export default formatDate;