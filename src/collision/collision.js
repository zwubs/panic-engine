/**
 *  @author zwubs
 */

import { Updater } from '../core/updater.js'

class Collision {

    constructor() {

        this.box2d = Box2D();

        this.gravity = new this.box2d.b2Vec2( 0.0, -10.0 );

        this.simulation = new this.box2d.b2World( gravity );

        this.colliders = [];

        this.shape = new this.box2d.b2PolygonShape();
        this.shape.SetAsBox( 1, 1 );

        Updater.add( this );

    }

    createCollisionBox( entity ) {

        var bd = new this.box2d.b2BodyDef();
        bd.set_type( this.box2d.b2_dynamicBody );
        bd.set_position( new this.box2d.b2Vec2( entity.position.x, entity.position.y ) );

        let body = world.CreateBody( bd );
        body.CreateFixture( shape, 5.0 );

        this.colliders.push(
            {
                box: body,
                mesh: entity.mesh
            }
        )

    }

    readObject(i, data) {
        let body = this.colliders[i];
        let bpos = body.GetPosition();
        data.x = bpos.get_x();
        data.y = bpos.get_y();
        data.angle = body.GetAngle();
    }

    update() {

        this.simulation.Step( Clock.delta, 2, 2);

        let data = { x: 0, y: 0, angle: 0 };

        for (var i = 0; i < NUM; i++) {

            readObject(i+1, data);

            let mesh = this.colliders[i].mesh;

            mesh.position.x = data.x;
            mesh.position.y = data.y;
            mesh.position.z = 0;
            mesh.rotation.set( 0, 0, data.angle );

        }

    }

}

let instance = new Collision();
export { instance as Collision }
