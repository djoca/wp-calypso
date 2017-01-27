/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { useSandbox } from 'test/helpers/use-sinon';
import useNock from 'test/helpers/use-nock';

import {
	timezonesRequestSuccess,
	timezonesReceive,
} from 'state/timezones/actions';

/*
 * Fixtures
 */
import {
	CONTINENTS,
	LABELS_OBJECT,
	RAW_OFFSETS,
	RAW_OFFSETS_OBJECT,
	TIMEZONES,
	TIMEZONES_BY_CONTINENT,
	WP_REST_API,
} from 'state/timezones/test/fixture';

/*
 * Util functions
 */
import { requestTimezones } from '../';

describe( 'request', () => {
	let dispatch;
	useSandbox( sandbox => ( dispatch = sandbox.spy() ) );

	describe( 'successful requests', () => {
		useNock( ( nock ) => {
			nock( WP_REST_API.hostname )
				.persist()
				.get( WP_REST_API.namespace + WP_REST_API.endpoint )
				.reply( 200, {
					found: 100,
					manual_utc_offsets: RAW_OFFSETS,
					timezones: TIMEZONES,
					timezones_by_continent: TIMEZONES_BY_CONTINENT
				} );
		} );

		it( 'should dispatch SUCCESS action when request completes', () => {
			const action = timezonesRequestSuccess();

			return requestTimezones( { dispatch } )
				.then( () => (
					expect( dispatch ).to.have.been.calledWith( action )
				) );
		} );

		it( 'should dispatch RECEIVE action when request completes', () => {
			const action = timezonesReceive( {
				rawOffsets: RAW_OFFSETS_OBJECT,
				labels: LABELS_OBJECT,
				byContinents: CONTINENTS
			} );

			return requestTimezones( { dispatch } )
				.then( () => (
					expect( dispatch ).to.have.been.calledWith( action )
				) );
		} );
	} );
} );
