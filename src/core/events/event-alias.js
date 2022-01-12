/**
 *  @author zwubs
 */

class EventAlias {

	constructor( alias, event ) {

		this.id = alias;
		this.event = event;

		this.event.addAlias( this );

	}

	set loop( value ) { this.event.loop = value; }
	get loop() { return this.event.loop; }
	get store() { return this.event.store; }

	emit( data ) { this.event.emit( data ); }

	add( func ) { this.event.add( func ); }

	clear( ) { this.event.clear(); }

}

export { EventAlias };
