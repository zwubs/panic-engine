return function() {

    if( this.store.jump ) {

        this.position.y += 0.1;

        if( this.position.y > 1 ) {

            this.store.jump = false;
        }

    }

    else if( this.store.air ) {

        this.position.y -= 0.1;

        if( this.position.y <= 0 ) this.store.air = false;

    }

}
