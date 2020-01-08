console.log('working')

function  foo () {
    console.log('awesome')
}

foo();

const boo = async () => {
    await console.log('e!eee');
    await console.log('done')
}

boo();

class fooo {
    constructor () {
        this.a = 'fafe';
    }
     nie() {
        console.log(this.a)
    }
}

let af = new fooo();
af.nie();