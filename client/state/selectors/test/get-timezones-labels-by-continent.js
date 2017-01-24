/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getTimezonesLabelsByContinent } from 'state/selectors';
import {
	CONTINENTS,
	LABELS_OBJECT,
	RAW_OFFSETS_OBJECT,
	TIMEZONES_ATLANTIC_OBJECT,
} from 'state/timezones/test/fixture';

describe( 'getTimezonesLabelsByContinent()', () => {
	it( 'should return null if `timezones` aren\'t synced', () => {
		const state = {
			timezones: {
				byContinents: [],
				labels: {},
				rawOffsets: {},
				requesting: false,
			}
		};

		const labelsByContinent = getTimezonesLabelsByContinent( state, 'Atlantic' );
		expect( labelsByContinent ).to.eql( null );
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

		const labelsByContinent = getTimezonesLabelsByContinent( state );
		expect( labelsByContinent ).to.eql( null );
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

		const labelsByContinent = getTimezonesLabelsByContinent( state, 'Atlantic' );
		expect( labelsByContinent ).to.eql( TIMEZONES_ATLANTIC_OBJECT );
	} );
} );
