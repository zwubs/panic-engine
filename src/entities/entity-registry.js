/**
 *	Tracks Entity Templates
 *	@object
 */
PANIC.EntityRegistry = new function() {

	this.data = [];

	this.getEntityByName = function( name ) { return this.data.find( o => o.name == name ); }
	this.getEntityByID = function( id ) { return this.data.find( o => o.id == id ); }

    /**
     *  @param {PANIC.EntityTemplate} template - The template of the tempalte to register
     */
    this.registerEntity = function( template ) {

        if( this.getEntityByID( template.id ) == undefined ) this.data.push( template );

        else PANIC.Debug.warn("Entity \"" + entity.id + "\" is already registered");

    }

	/**
	 *	@param {String} id
	 */
	this.unregisterEntity = function( id ) {

		if( this.getEntityByID( template.id ) != undefined ) delete this.getEntityByID( template.id );

	}

	/**
	 *	@param {String} id
	 */
	this.spawnEntity = function( id ) {

		if( this.getEntityByID( id ) != undefined ) return this.getEntityByID( id ).spawnEntity();

	}

};
