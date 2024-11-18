using capacityManagement as db from '../db/schema';

@path: '/capacityManageSrv'
service capacityManagementSrv {

     entity Materials as projection on db.Materials;
         
}
