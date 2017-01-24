/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getTimezonesLabel } from '../';
import {
	RAW_OFFSETS,
	TIMEZONES_BY_CONTINENT,
} from 'state/timezones/test/fixture';

describe( 'getTimezonesLabel()', () => {
	it( 'should return null if `timezones` aren\'t synced', () => {
		const state = {
			rawOffsets: [],
			byContinent: {},
			requesting: false,
		};

		const label = getTimezonesLabel( state );

		expect( label ).to.eql( null );
	} );

	it( 'should return null if `key` isn\'t defined', () => {
		const state = {
			rawOffsets: RAW_OFFSETS,
			byContinent: TIMEZONES_BY_CONTINENT,
			requesting: false,
		};

		const label = getTimezonesLabel( state );
		expect( label ).to.eql( null );
	} );

	it( 'should return the label of the given key', () => {
		const state = {
			timezones: {
				rawOffsets: RAW_OFFSETS,
				byContinent: TIMEZONES_BY_CONTINENT,
				requesting: false,
			}
		};

		const label = getTimezonesLabel( state, 'Australia/Broken_Hill' );
		expect( label ).to.eql( 'Broken Hill' );
	} );
} );
