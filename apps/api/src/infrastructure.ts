/**
 * Composition-root extension point for MongoDB.
 * Healthcheck does not open a connection; future features should construct ServiceMongoose here.
 */
export { createMemoryMongoUri, ServiceMongoose } from '@axc/service-mongoose';
