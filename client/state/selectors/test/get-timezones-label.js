/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getTimezonesLabel } from '../';
import {
	CONTINENTS,
	LABELS_OBJECT,
	RAW_OFFSETS_OBJECT,
} from 'state/timezones/test/fixture';

describe( 'getTimezonesLabel()', () => {
	it( 'should return null if `timezones` aren\'t synced', () => {
		const state = {
			timezones: {
				byContinents: [],
				labels: {},
				rawOffsets: {},
				requesting: false,
			}
		};

		const label = getTimezonesLabel( state );

		expect( label ).to.eql( null );
	} );

	it( 'should return null if `key` isn\'t defined', () => {
		const state = {
			timezones: {
				byContinents: CONTINENTS,
				labels: LABELS_OBJECT,
				rawOffsets: RAW_OFFSETS_OBJECT,
				requesting: false,
			}
		};

		const label = getTimezonesLabel( state );
		expect( label ).to.eql( null );
	} );

	it( 'should return the label of the given key', () => {
		const state = {
			timezones: {
				byContinents: CONTINENTS,
				labels: LABELS_OBJECT,
				rawOffsets: RAW_OFFSETS_OBJECT,
				requesting: false,
			}
		};

		const label = getTimezonesLabel( state, 'Australia/Broken_Hill' );
		expect( label ).to.eql( 'Broken Hill' );
	} );
} );
