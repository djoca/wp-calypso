/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getTimezonesLabels } from '../';
import {
	CONTINENTS,
	LABELS_OBJECT,
	RAW_OFFSETS_OBJECT,
} from 'state/timezones/test/fixture';

describe( 'getTimezonesLabels()', () => {
	it( 'should return {} if `timezones` aren\'t synced', () => {
		const state = {
			timezones: {
				byContinents: {},
				labels: {},
				rawOffsets: {},
				requesting: false,
			}
		};

		const timezonesLabels = getTimezonesLabels( state );

		expect( timezonesLabels ).to.eql( {} );
	} );

	it( 'should return timezones by contienent object data', () => {
		const state = {
			timezones: {
				byContinents: CONTINENTS,
				labels: LABELS_OBJECT,
				rawOffsets: RAW_OFFSETS_OBJECT,
				requesting: false,
			}
		};

		const labels = getTimezonesLabels( state );

		expect( labels ).to.eql( LABELS_OBJECT );
	} );
} );
