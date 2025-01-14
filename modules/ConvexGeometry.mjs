import { BufferGeometry, Float32BufferAttribute } from 'https://unpkg.com/three@0.130.1/build/three.module.js';
import { ConvexHull } from './ConvexHull.mjs';

class ConvexGeometry extends BufferGeometry {

	constructor( points ) {
		super();

		const vertices = [];
		const normals = [];
		const convexHull = new ConvexHull().setFromPoints( points );
		const faces = convexHull.faces;

		for ( let i = 0; i < faces.length; i ++ ) {
			const face = faces[ i ];
			let edge = face.edge;
			do {
				const point = edge.head().point;

				vertices.push( point.x, point.y, point.z );
				normals.push( face.normal.x, face.normal.y, face.normal.z );

				edge = edge.next;
			} while ( edge !== face.edge );

		}
		this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );

	}

}

export { ConvexGeometry };
