/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getTimezonesByContinent } from '../';
import {
	CONTINENTS,
	LABELS_OBJECT,
	RAW_OFFSETS_OBJECT,
	TIMEZONES_ATLANTIC,
} from 'state/timezones/test/fixture';

describe( 'getTimezonesByContinent()', () => {
	it( 'should return null if `timezones` aren\'t synced', () => {
		const state = {
			timezones: {
				byContinents: [],
				labels: {},
				rawOffsets: {},
				requesting: false,
			}
		};

		const byContinent = getTimezonesByContinent( state, 'Atlantic' );
		expect( byContinent ).to.eql( null );
	} );

	it( 'should return null if `continent` isn\'t defined', () => {
		const state = {
			timezones: {
				byContinents: CONTINENTS,
				labels: LABELS_OBJECT,
				rawOffsets: RAW_OFFSETS_OBJECT,
				requesting: false,
			}
		};

		const byContinent = getTimezonesByContinent( state );
		expect( byContinent ).to.eql( null );
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

		const byContinent = getTimezonesByContinent( state, 'Atlantic' );
		expect( byContinent ).to.eql( TIMEZONES_ATLANTIC );
	} );
} );
