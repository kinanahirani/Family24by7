import {useState, useEffect} from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const usePermissions = (initialPermissionsList = []) => {
  const [permissionsStatus, setPermissionsStatus] = useState({});

  const checkPermission = async permission => {
    try {
      return await check(permission);
    } catch (error) {
      console.error('Error checking permission:', permission, error);
      return RESULTS.UNAVAILABLE;
    }
  };

  const checkPermissions = async (permissionsList = initialPermissionsList) => {
    try {
      const statuses = {};
      for (const permission of permissionsList) {
        statuses[permission] = await checkPermission(permission);
      }
      setPermissionsStatus(statuses);
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const requestPermission = async permission => {
    try {
      const result = await request(permission);
      setPermissionsStatus(prevStatus => ({
        ...prevStatus,
        [permission]: result,
      }));
      return result;
    } catch (error) {
      console.error('Error requesting permission:', permission, error);
      return RESULTS.UNAVAILABLE;
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    permissionsStatus,
    checkPermission,
    requestPermission,
    checkPermissions,
  };
};
