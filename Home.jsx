import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import i18n from 'i18n-js';
import ConfigButton from './ConfigButton';
import ConfigOutput from './ConfigOutput';
import { yearsDiffFromNow, monthesDiff } from './dateDiff';

const townTax = [ 
    {id: '1342', percent: 0.12, ceil: 191400.0},
    {id: '1375', percent: 0.12, ceil: 191400.0},
    {id: '1220', percent: 0.10, ceil: 161520.0},
    {id: '1081', percent: 0.10, ceil: 161520.0},
    {id:  '400', percent: 0.07, ceil: 131640.0},
    {id: '4011', percent: 0.12, ceil: 191400.0},
    {id: '3786', percent: 0.12, ceil: 191400.0},
    {id: '1311', percent: 0.20, ceil: 240360.0},
    {id: '3759', percent: 0.07, ceil: 131640.0},
    {id: '4010', percent: 0.12, ceil: 191400.0},
    {id: '1046', percent: 0.20, ceil: 240360.0},
    {id: '1358', percent: 0.12, ceil: 191400.0},
    {id:   '31', percent: 0.18, ceil: 233280.0},
    {id: '1294', percent: 0.12, ceil: 191400.0},
    {id:   '67', percent: 0.20, ceil: 240360.0},
    {id: '4013', percent: 0.12, ceil: 191400.0},
    {id:  '403', percent: 0.07, ceil: 131640.0},
    {id:  '821', percent: 0.07, ceil: 131640.0},
    {id:  '785', percent: 0.07, ceil: 131640.0},
    {id:  '338', percent: 0.20, ceil: 240360.0},
    {id:   '77', percent: 0.07, ceil: 131640.0},
    {id:  '294', percent: 0.10, ceil: 161520.0},
    {id: '1126', percent: 0.12, ceil: 191400.0},
    {id:   '37', percent: 0.07, ceil: 131640.0},
    {id: '4003', percent: 0.12, ceil: 191400.0},
    {id: '1359', percent: 0.12, ceil: 191400.0},
    {id:  '330', percent: 0.12, ceil: 191400.0},
    {id: '4002', percent: 0.12, ceil: 191400.0},
    {id: '1365', percent: 0.07, ceil: 131640.0},
    {id: '1248', percent: 0.12, ceil: 191400.0},
    {id:  '730', percent: 0.07, ceil: 131640.0},
    {id: '1125', percent: 0.07, ceil: 131640.0},
    {id:  '603', percent: 0.10, ceil: 161520.0},
    {id: '1064', percent: 0.07, ceil: 131640.0},
    {id: '1253', percent: 0.07, ceil: 131640.0},
    {id:   '23', percent: 0.07, ceil: 131640.0},
    {id: '4012', percent: 0.07, ceil: 131640.0},
    {id: '3754', percent: 0.12, ceil: 191400.0},
    {id: '4301', percent: 0.12, ceil: 191400.0},
    {id:  '176', percent: 0.12, ceil: 191400.0},
    {id: '3598', percent: 0.12, ceil: 191400.0},
    {id:  '714', percent: 0.20, ceil: 240360.0},
    {id:   '71', percent: 0.07, ceil: 131640.0},
    {id: '1276', percent: 0.07, ceil: 131640.0},
    {id:  '199', percent: 0.12, ceil: 191400.0},
    {id: '1188', percent: 0.07, ceil: 131640.0},
    {id: '3722', percent: 0.07, ceil: 131640.0},
    {id: '2021', percent: 0.10, ceil: 161520.0},
    {id: '1256', percent: 0.07, ceil: 131640.0},
    {id:   '21', percent: 0.12, ceil: 191400.0},
    {id: '1278', percent: 0.12, ceil: 191400.0},
    {id:  '399', percent: 0.20, ceil: 240360.0},
    {id:  '559', percent: 0.07, ceil: 131640.0},
    {id: '4001', percent: 0.12, ceil: 191400.0},
    {id:  '762', percent: 0.07, ceil: 131640.0},
    {id: '1348', percent: 0.12, ceil: 191400.0},
    {id:  '368', percent: 0.07, ceil: 131640.0},
    {id:  '480', percent: 0.14, ceil: 233280.0},
    {id:  '723', percent: 0.07, ceil: 131640.0},
    {id:  '322', percent: 0.12, ceil: 191400.0},
    {id:  '572', percent: 0.07, ceil: 131640.0},
    {id: '3645', percent: 0.12, ceil: 191400.0},
    {id:  '143', percent: 0.12, ceil: 191400.0},
    {id:  '265', percent: 0.12, ceil: 191400.0},
    {id:  '598', percent: 0.07, ceil: 131640.0},
    {id: '9200', percent: 0.12, ceil: 191400.0},
    {id:  '712', percent: 0.10, ceil: 161520.0},
    {id: '1368', percent: 0.07, ceil: 131640.0},
    {id: '4015', percent: 0.07, ceil: 131640.0},
    {id: '1363', percent: 0.20, ceil: 240360.0},
    {id: '1191', percent: 0.12, ceil: 191400.0},
    {id:  '428', percent: 0.20, ceil: 240360.0},
    {id: '2060', percent: 0.07, ceil: 131640.0},
    {id:  '487', percent: 0.14, ceil: 233280.0},
    {id:  '352', percent: 0.07, ceil: 131640.0},
    {id:  '424', percent: 0.20, ceil: 240360.0},
    {id: '2014', percent: 0.07, ceil: 131640.0},
    {id: '1344', percent: 0.07, ceil: 131640.0},
    {id: '4021', percent: 0.07, ceil: 131640.0},
    {id:  '342', percent: 0.20, ceil: 240360.0},
    {id:   '35', percent: 0.07, ceil: 131640.0},
    {id:  '755', percent: 0.10, ceil: 161520.0},
    {id: '1219', percent: 0.10, ceil: 161520.0},
    {id: '1204', percent: 0.07, ceil: 131640.0},
    {id:  '736', percent: 0.07, ceil: 131640.0},
    {id:  '262', percent: 0.07, ceil: 131640.0},
    {id: '1206', percent: 0.07, ceil: 131640.0},
    {id:  '463', percent: 0.10, ceil: 161520.0},
    {id: '1129', percent: 0.12, ceil: 191400.0},
    {id: '4022', percent: 0.07, ceil: 131640.0},
    {id:  '305', percent: 0.12, ceil: 191400.0},
    {id:  '574', percent: 0.10, ceil: 161520.0},
    {id:  '849', percent: 0.07, ceil: 131640.0},
    {id:   '62', percent: 0.12, ceil: 191400.0},
    {id:  '336', percent: 0.20, ceil: 240360.0},
    {id:  '492', percent: 0.12, ceil: 191400.0},
    {id: '2200', percent: 0.16, ceil: 191400.0},
    {id:  '431', percent: 0.12, ceil: 191400.0},
    {id:  '303', percent: 0.12, ceil: 191400.0},
    {id: '1241', percent: 0.20, ceil: 240360.0},
    {id: '1349', percent: 0.12, ceil: 191400.0},
    {id:  '702', percent: 0.12, ceil: 191400.0},
    {id:  '356', percent: 0.12, ceil: 191400.0},
    {id: '1208', percent: 0.10, ceil: 161520.0},
    {id: '1261', percent: 0.07, ceil: 131640.0},
    {id: '1203', percent: 0.07, ceil: 131640.0},
    {id:  '584', percent: 0.20, ceil: 240360.0},
    {id: '1065', percent: 0.20, ceil: 240360.0},
    {id: '2064', percent: 0.07, ceil: 131640.0},
    {id: '3764', percent: 0.10, ceil: 161520.0},
    {id: '4026', percent: 0.07, ceil: 131640.0},
    {id: '1239', percent: 0.20, ceil: 240360.0},
    {id:  '253', percent: 0.07, ceil: 131640.0},
    {id:  '662', percent: 0.10, ceil: 161520.0},
    {id: '1332', percent: 0.12, ceil: 191400.0},
    {id:  '374', percent: 0.07, ceil: 131640.0},
    {id: '1303', percent: 0.18, ceil: 233280.0},
    {id:  '496', percent: 0.14, ceil: 233280.0},
    {id: '1047', percent: 0.07, ceil: 131640.0},
    {id: '1272', percent: 0.07, ceil: 131640.0},
    {id:  '820', percent: 0.07, ceil: 131640.0},
    {id:  '343', percent: 0.12, ceil: 191400.0},
    {id: '3646', percent: 0.12, ceil: 191400.0},
    {id: '4005', percent: 0.12, ceil: 191400.0},
    {id:   '13', percent: 0.12, ceil: 191400.0},
    {id:  '397', percent: 0.10, ceil: 161520.0},
    {id: '1209', percent: 0.07, ceil: 131640.0},
    {id:  '962', percent: 0.12, ceil: 191400.0},
    {id:  '268', percent: 0.12, ceil: 191400.0},
    {id: '1181', percent: 0.07, ceil: 131640.0},
    {id: '3743', percent: 0.07, ceil: 131640.0},
    {id: '1214', percent: 0.07, ceil: 131640.0},
    {id: '1232', percent: 0.20, ceil: 240360.0},
    {id:  '358', percent: 0.20, ceil: 240360.0},
    {id: '1158', percent: 0.12, ceil: 191400.0},
    {id: '1226', percent: 0.07, ceil: 131640.0},
    {id: '4007', percent: 0.12, ceil: 191400.0},
    {id:  '803', percent: 0.10, ceil: 161520.0},
    {id:  '866', percent: 0.12, ceil: 191400.0},
    {id:  '811', percent: 0.20, ceil: 240360.0},
    {id:   '29', percent: 0.12, ceil: 191400.0},
    {id:  '575', percent: 0.07, ceil: 131640.0},
    {id: '1138', percent: 0.07, ceil: 131640.0},
    {id: '3566', percent: 0.12, ceil: 191400.0},
    {id: '2026', percent: 0.12, ceil: 191400.0},
    {id:  '831', percent: 0.16, ceil: 191400.0},
    {id:  '916', percent: 0.20, ceil: 240360.0},
    {id: '1227', percent: 0.20, ceil: 240360.0},
    {id:  '576', percent: 0.10, ceil: 161520.0},
    {id: '1338', percent: 0.12, ceil: 191400.0},
    {id: '1252', percent: 0.07, ceil: 131640.0},
    {id: '1210', percent: 0.07, ceil: 131640.0},
    {id: '1367', percent: 0.12, ceil: 191400.0},
    {id:  '840', percent: 0.20, ceil: 240360.0},
    {id: '1153', percent: 0.07, ceil: 131640.0},
    {id: '1183', percent: 0.10, ceil: 161520.0},
    {id: '1229', percent: 0.07, ceil: 131640.0},
    {id: '1331', percent: 0.12, ceil: 191400.0},
    {id: '1291', percent: 0.12, ceil: 191400.0},
    {id: '1201', percent: 0.07, ceil: 131640.0},
    {id: '4028', percent: 0.07, ceil: 131640.0},
    {id:   '63', percent: 0.12, ceil: 191400.0},
    {id: '1059', percent: 0.18, ceil: 233280.0},
    {id: '1296', percent: 0.14, ceil: 233280.0},
    {id:  '357', percent: 0.12, ceil: 191400.0},
    {id:   '76', percent: 0.12, ceil: 191400.0},
    {id:  '443', percent: 0.07, ceil: 131640.0},
    {id:  '609', percent: 0.12, ceil: 191400.0},
    {id: '1297', percent: 0.07, ceil: 131640.0},
    {id: '4004', percent: 0.12, ceil: 191400.0},
    {id: '1095', percent: 0.20, ceil: 240360.0},
    {id:  '297', percent: 0.07, ceil: 131640.0},
    {id:  '345', percent: 0.12, ceil: 191400.0},
    {id:  '845', percent: 0.20, ceil: 240360.0},
    {id:  '295', percent: 0.12, ceil: 191400.0},
    {id:  '605', percent: 0.07, ceil: 131640.0},
    {id: '1285', percent: 0.07, ceil: 131640.0},
    {id:  '664', percent: 0.12, ceil: 191400.0},
    {id: '1085', percent: 0.20, ceil: 240360.0},
    {id: '1374', percent: 0.07, ceil: 131640.0},
    {id: '1139', percent: 0.07, ceil: 131640.0},
    {id:  '768', percent: 0.20, ceil: 240360.0},
    {id: '1198', percent: 0.07, ceil: 131640.0},
    {id: '3656', percent: 0.07, ceil: 131640.0},
    {id: '1207', percent: 0.07, ceil: 131640.0},
    {id: '1230', percent: 0.07, ceil: 131640.0},
    {id: '2023', percent: 0.07, ceil: 131640.0},
    {id:  '595', percent: 0.07, ceil: 131640.0},
    {id: '1171', percent: 0.07, ceil: 131640.0},
    {id: '1255', percent: 0.12, ceil: 191400.0},
    {id:  '674', percent: 0.10, ceil: 161520.0},
    {id:   '24', percent: 0.07, ceil: 131640.0},
    {id: '1173', percent: 0.07, ceil: 131640.0},
    {id: '1060', percent: 0.18, ceil: 233280.0},
    {id: '4204', percent: 0.12, ceil: 191400.0},
    {id: '1080', percent: 0.07, ceil: 131640.0},
    {id:  '829', percent: 0.20, ceil: 240360.0},
    {id:  '573', percent: 0.20, ceil: 240360.0},
    {id:  '481', percent: 0.12, ceil: 191400.0},
    {id:   '65', percent: 0.07, ceil: 131640.0},
    {id:  '695', percent: 0.20, ceil: 240360.0},
    {id: '1360', percent: 0.12, ceil: 191400.0},
    {id: '1163', percent: 0.07, ceil: 131640.0},
    {id: '3599', percent: 0.12, ceil: 191400.0},
    {id: '1416', percent: 0.10, ceil: 161520.0},
    {id: '1415', percent: 0.07, ceil: 131640.0},
    {id: '1196', percent: 0.07, ceil: 131640.0},
    {id:  '308', percent: 0.07, ceil: 131640.0},
    {id: '4019', percent: 0.12, ceil: 191400.0},
    {id:  '607', percent: 0.12, ceil: 191400.0},
    {id: '1268', percent: 0.13, ceil: 161520.0},
    {id: '1343', percent: 0.12, ceil: 191400.0},
    {id: '1202', percent: 0.07, ceil: 131640.0},
    {id: '2044', percent: 0.10, ceil: 161520.0},
    {id: '1174', percent: 0.07, ceil: 131640.0},
    {id: '1205', percent: 0.10, ceil: 161520.0},
    {id:   '48', percent: 0.12, ceil: 191400.0},
    {id:  '263', percent: 0.12, ceil: 191400.0},
    {id:  '748', percent: 0.07, ceil: 131640.0},
    {id: '4203', percent: 0.14, ceil: 233280.0},
    {id: '1082', percent: 0.07, ceil: 131640.0},
    {id:  '678', percent: 0.12, ceil: 191400.0},
    {id:  '272', percent: 0.12, ceil: 191400.0},
    {id: '3657', percent: 0.10, ceil: 161520.0},
    {id:  '570', percent: 0.10, ceil: 161520.0},
    {id:  '518', percent: 0.10, ceil: 161520.0},
    {id: '4008', percent: 0.07, ceil: 131640.0},
    {id: '1063', percent: 0.14, ceil: 233280.0},
    {id:  '668', percent: 0.20, ceil: 240360.0},
    {id: '3745', percent: 0.07, ceil: 131640.0},
    {id:  '325', percent: 0.10, ceil: 161520.0},
    {id:   '99', percent: 0.18, ceil: 233280.0},
    {id: '3610', percent: 0.07, ceil: 131640.0},
    {id: '4101', percent: 0.12, ceil: 191400.0},
    {id: '1340', percent: 0.12, ceil: 191400.0},
    {id:  '421', percent: 0.10, ceil: 161520.0},
    {id: '3605', percent: 0.12, ceil: 191400.0},
    {id: '3785', percent: 0.12, ceil: 191400.0},
    {id:  '732', percent: 0.07, ceil: 131640.0},
    {id:  '395', percent: 0.07, ceil: 131640.0},
    {id: '4551', percent: 0.07, ceil: 131640.0},
    {id: '1124', percent: 0.12, ceil: 191400.0},
    {id:  '408', percent: 0.12, ceil: 191400.0},
    {id: '1197', percent: 0.12, ceil: 191400.0},
    {id:  '396', percent: 0.07, ceil: 131640.0},
    {id: '3724', percent: 0.10, ceil: 161520.0},
    {id: '9100', percent: 0.12, ceil: 203400.0},
    {id: '4304', percent: 0.12, ceil: 191400.0},
    {id: '1366', percent: 0.20, ceil: 240360.0},
    {id:  '590', percent: 0.12, ceil: 191400.0},
    {id: '4303', percent: 0.12, ceil: 191400.0},
    {id:  '296', percent: 0.12, ceil: 191400.0},
    {id: '1057', percent: 0.07, ceil: 131640.0},
    {id: '1314', percent: 0.10, ceil: 161520.0},
    {id: '1279', percent: 0.12, ceil: 191400.0},
    {id:   '15', percent: 0.07, ceil: 131640.0},
    {id:  '844', percent: 0.20, ceil: 240360.0},
    {id:  '522', percent: 0.12, ceil: 191400.0},
    {id: '4014', percent: 0.12, ceil: 191400.0},
    {id: '1369', percent: 0.07, ceil: 131640.0},
    {id: '1195', percent: 0.12, ceil: 191400.0},
    {id: '1280', percent: 0.12, ceil: 191400.0},
    {id:  '402', percent: 0.20, ceil: 240360.0},
    {id: '2047', percent: 0.07, ceil: 131640.0},
    {id:   '69', percent: 0.20, ceil: 240360.0},
    {id:  '348', percent: 0.20, ceil: 240360.0},
    {id: '2048', percent: 0.07, ceil: 131640.0},
    {id:  '602', percent: 0.20, ceil: 240360.0},
    {id: '4035', percent: 0.12, ceil: 191400.0},
    {id: '1143', percent: 0.07, ceil: 131640.0},
    {id: '3713', percent: 0.12, ceil: 191400.0},
    {id: '1242', percent: 0.20, ceil: 240360.0},
    {id:  '246', percent: 0.16, ceil: 203400.0},
    {id:  '578', percent: 0.12, ceil: 191400.0},
    {id: '3756', percent: 0.10, ceil: 161520.0},
    {id: '1238', percent: 0.20, ceil: 240360.0},
    {id: '1245', percent: 0.12, ceil: 191400.0},
    {id: '1156', percent: 0.12, ceil: 191400.0},
    {id: '3777', percent: 0.07, ceil: 131640.0},
    {id:  '419', percent: 0.20, ceil: 240360.0},
    {id:  '454', percent: 0.10, ceil: 161520.0},
    {id: '1176', percent: 0.12, ceil: 191400.0},
    {id:  '892', percent: 0.12, ceil: 191400.0},
    {id:  '376', percent: 0.10, ceil: 161520.0},
    {id:  '328', percent: 0.12, ceil: 191400.0},
    {id: '1175', percent: 0.12, ceil: 191400.0},
    {id:  '546', percent: 0.10, ceil: 161520.0},
    {id:  '273', percent: 0.07, ceil: 131640.0},
    {id: '2042', percent: 0.12, ceil: 191400.0},
    {id: '1240', percent: 0.20, ceil: 240360.0},
    {id:  '289', percent: 0.07, ceil: 131640.0},
    {id:  '383', percent: 0.12, ceil: 191400.0},
    {id:  '676', percent: 0.20, ceil: 240360.0},
    {id: '4503', percent: 0.12, ceil: 191400.0},
    {id: '1053', percent: 0.12, ceil: 191400.0},
    {id:  '806', percent: 0.12, ceil: 191400.0},
    {id:  '813', percent: 0.10, ceil: 161520.0},
    {id: '4502', percent: 0.14, ceil: 233280.0},
    {id: '1251', percent: 0.12, ceil: 191400.0},
    {id: '1187', percent: 0.12, ceil: 191400.0},
    {id: '1146', percent: 0.20, ceil: 240360.0},
    {id:  '688', percent: 0.12, ceil: 191400.0},
    {id: '1212', percent: 0.07, ceil: 131640.0},
    {id:  '385', percent: 0.07, ceil: 131640.0},
    {id:  '318', percent: 0.20, ceil: 240360.0},
    {id:  '319', percent: 0.12, ceil: 191400.0},
    {id:  '708', percent: 0.07, ceil: 131640.0},
    {id:  '917', percent: 0.07, ceil: 131640.0},
    {id: '1335', percent: 0.12, ceil: 191400.0},
    {id: '2560', percent: 0.16, ceil: 191400.0},
    {id: '1192', percent: 0.18, ceil: 233280.0},
    {id: '3748', percent: 0.10, ceil: 161520.0},
    {id: '1151', percent: 0.12, ceil: 191400.0},
    {id:  '750', percent: 0.07, ceil: 131640.0},
    {id: '1104', percent: 0.07, ceil: 131640.0},
    {id: '1313', percent: 0.07, ceil: 131640.0},
    {id:  '749', percent: 0.07, ceil: 131640.0},
    {id: '1185', percent: 0.07, ceil: 131640.0},
    {id: '3723', percent: 0.12, ceil: 191400.0},
    {id:  '535', percent: 0.14, ceil: 233280.0},
    {id: '2059', percent: 0.07, ceil: 131640.0},
    {id: '3615', percent: 0.12, ceil: 191400.0},
    {id:  '536', percent: 0.14, ceil: 233280.0},
    {id:  '281', percent: 0.12, ceil: 191400.0},
    {id:  '599', percent: 0.07, ceil: 131640.0},
    {id: '1231', percent: 0.20, ceil: 240360.0},
    {id:  '413', percent: 0.10, ceil: 161520.0},
    {id: '1180', percent: 0.07, ceil: 131640.0},
    {id: '1213', percent: 0.12, ceil: 191400.0},
    {id: '1136', percent: 0.20, ceil: 240360.0},
    {id: '1150', percent: 0.12, ceil: 191400.0},
    {id: '1262', percent: 0.12, ceil: 191400.0},
    {id:  '774', percent: 0.10, ceil: 161520.0},
    {id: '1221', percent: 0.07, ceil: 131640.0},
    {id: '8000', percent: 0.12, ceil: 191400.0},
    {id: '4025', percent: 0.07, ceil: 131640.0},
    {id: '1211', percent: 0.07, ceil: 131640.0},
    {id: '1052', percent: 0.12, ceil: 191400.0},
    {id:  '414', percent: 0.07, ceil: 131640.0},
    {id: '3601', percent: 0.10, ceil: 161520.0},
    {id: '4024', percent: 0.10, ceil: 161520.0},
    {id: '1347', percent: 0.12, ceil: 191400.0},
    {id: '4100', percent: 0.12, ceil: 191400.0},
    {id: '3611', percent: 0.12, ceil: 191400.0},
    {id: '4006', percent: 0.12, ceil: 191400.0},
    {id: '1334', percent: 0.12, ceil: 191400.0},
    {id:   '26', percent: 0.07, ceil: 131640.0},
    {id:  '354', percent: 0.12, ceil: 191400.0},
    {id: '1225', percent: 0.07, ceil: 131640.0},
    {id:  '390', percent: 0.07, ceil: 131640.0},
    {id: '1161', percent: 0.16, ceil: 203400.0},
    {id: '1341', percent: 0.07, ceil: 131640.0},
    {id:  '362', percent: 0.07, ceil: 131640.0},
    {id: '3619', percent: 0.12, ceil: 191400.0},
    {id: '3782', percent: 0.12, ceil: 191400.0},
    {id:  '854', percent: 0.12, ceil: 191400.0},
    {id:  '540', percent: 0.12, ceil: 191400.0},
    {id: '4702', percent: 0.07, ceil: 131640.0},
    {id:  '372', percent: 0.12, ceil: 191400.0},
    {id: '4701', percent: 0.12, ceil: 191400.0},
    {id:  '789', percent: 0.07, ceil: 131640.0},
    {id:  '713', percent: 0.20, ceil: 240360.0},
    {id: '1228', percent: 0.07, ceil: 131640.0},
    {id:  '324', percent: 0.12, ceil: 191400.0},
    {id: '1377', percent: 0.07, ceil: 131640.0},
    {id: '1286', percent: 0.18, ceil: 233280.0},
    {id:  '304', percent: 0.12, ceil: 191400.0},
    {id:  '861', percent: 0.12, ceil: 191400.0},
    {id:  '885', percent: 0.12, ceil: 191400.0},
    {id:   '36', percent: 0.07, ceil: 131640.0},
    {id:  '259', percent: 0.12, ceil: 191400.0},
    {id:  '329', percent: 0.12, ceil: 191400.0},
    {id: '1058', percent: 0.20, ceil: 240360.0},
    {id: '2049', percent: 0.07, ceil: 131640.0},
    {id: '1223', percent: 0.20, ceil: 240360.0},
    {id: '2057', percent: 0.12, ceil: 191400.0},
    {id: '3578', percent: 0.12, ceil: 191400.0},
    {id: '1031', percent: 0.20, ceil: 240360.0},
    {id:  '761', percent: 0.20, ceil: 240360.0},
    {id:  '394', percent: 0.07, ceil: 131640.0},
    {id: '1265', percent: 0.12, ceil: 191400.0},
    {id:  '415', percent: 0.20, ceil: 240360.0},
    {id: '1235', percent: 0.07, ceil: 131640.0},
    {id:  '527', percent: 0.07, ceil: 131640.0},
    {id: '1266', percent: 0.10, ceil: 161520.0},
    {id:  '865', percent: 0.07, ceil: 131640.0},
    {id: '1267', percent: 0.10, ceil: 161520.0},
    {id:  '658', percent: 0.12, ceil: 191400.0},
    {id: '1160', percent: 0.07, ceil: 131640.0},
    {id:  '873', percent: 0.07, ceil: 131640.0},
    {id: '1373', percent: 0.07, ceil: 131640.0},
    {id: '1364', percent: 0.20, ceil: 240360.0},
    {id:  '366', percent: 0.12, ceil: 191400.0},
    {id: '3784', percent: 0.07, ceil: 131640.0},
    {id:  '432', percent: 0.07, ceil: 131640.0},
    {id: '1287', percent: 0.07, ceil: 131640.0},
    {id: '1132', percent: 0.12, ceil: 191400.0},
    {id:  '538', percent: 0.12, ceil: 191400.0},
    {id: '4009', percent: 0.07, ceil: 131640.0},
    {id:  '264', percent: 0.12, ceil: 191400.0},
    {id:  '846', percent: 0.07, ceil: 131640.0},
    {id: '1233', percent: 0.07, ceil: 131640.0},
    {id:  '398', percent: 0.07, ceil: 131640.0},
    {id: '2062', percent: 0.07, ceil: 131640.0},
    {id: '2061', percent: 0.07, ceil: 131640.0},
    {id: '1172', percent: 0.07, ceil: 131640.0},
    {id: '1083', percent: 0.20, ceil: 240360.0},
    {id:  '719', percent: 0.12, ceil: 191400.0},
    {id: '1054', percent: 0.18, ceil: 233280.0},
    {id: '1283', percent: 0.12, ceil: 191400.0},
    {id: '3719', percent: 0.10, ceil: 161520.0},
    {id: '1051', percent: 0.20, ceil: 240360.0},
    {id: '2050', percent: 0.07, ceil: 131640.0},
    {id: '1237', percent: 0.20, ceil: 240360.0},
    {id:  '814', percent: 0.07, ceil: 131640.0},
    {id:  '709', percent: 0.12, ceil: 191400.0},
    {id:  '665', percent: 0.20, ceil: 240360.0},
    {id: '1346', percent: 0.12, ceil: 191400.0}, 
        
    {id: '1275', percent: 0.07, ceil: 131640.0},
    {id: '3556', percent: 0.07, ceil: 131640.0},
    {id:  '313', percent: 0.07, ceil: 131640.0},
    {id: '3612', percent: 0.07, ceil: 131640.0},
    {id: '3613', percent: 0.07, ceil: 131640.0},
    {id: '3606', percent: 0.07, ceil: 131640.0},
    {id: '1317', percent: 0.07, ceil: 131640.0},
    {id: '3639', percent: 0.07, ceil: 131640.0},
    {id:  '948', percent: 0.07, ceil: 131640.0},
    {id: '3609', percent: 0.07, ceil: 131640.0},
    {id: '1112', percent: 0.07, ceil: 131640.0},
    {id: '3607', percent: 0.07, ceil: 131640.0},
    {id: '1263', percent: 0.11, ceil: 160560.0},
    {id: '3825', percent: 0.07, ceil: 131640.0},
    {id: '1178', percent: 0.07, ceil: 131640.0},
    {id: '1282', percent: 0.07, ceil: 131640.0},
    {id: '3614', percent: 0.07, ceil: 131640.0},
    {id: '1154', percent: 0.07, ceil: 131640.0},
    {id:  '298', percent: 0.07, ceil: 131640.0},
    {id: '1127', percent: 0.07, ceil: 131640.0},
    {id: '1222', percent: 0.07, ceil: 131640.0},
    {id:  '256', percent: 0.07, ceil: 131640.0},
    {id: '3620', percent: 0.07, ceil: 131640.0},
    {id: '3555', percent: 0.07, ceil: 131640.0},
    {id: '1179', percent: 0.07, ceil: 131640.0},
    {id: '2016', percent: 0.07, ceil: 131640.0},
    {id:  '437', percent: 0.07, ceil: 131640.0},
    {id:  '439', percent: 0.07, ceil: 131640.0},
    {id: '3558', percent: 0.07, ceil: 131640.0},

    {id: '1115', percent: 0.14, ceil: 197400.0},
    {id: '1068', percent: 0.12, ceil: 167520.0},
    {id: '4017', percent: 0.14, ceil: 197400.0},
    {id: '1152', percent: 0.07, ceil: 131640.0},
    {id:  '589', percent: 0.12, ceil: 167520.0},
    {id:  '667', percent: 0.14, ceil: 197400.0},
    {id:  '852', percent: 0.07, ceil: 131640.0},
    {id: '1067', percent: 0.14, ceil: 197400.0},
    {id: '2063', percent: 0.14, ceil: 197400.0},
    {id:  '302', percent: 0.14, ceil: 197400.0},
    {id:  '280', percent: 0.12, ceil: 167520.0},
    {id: '1177', percent: 0.07, ceil: 131640.0},
    {id: '2009', percent: 0.14, ceil: 197400.0},
    {id:  '409', percent: 0.07, ceil: 131640.0},
    {id:  '795', percent: 0.14, ceil: 197400.0},
    {id:  '453', percent: 0.14, ceil: 197400.0},
    {id:  '623', percent: 0.14, ceil: 197400.0},
    {id:  '579', percent: 0.12, ceil: 167520.0},
    {id: '1130', percent: 0.12, ceil: 167520.0},
    {id:  '380', percent: 0.07, ceil: 131640.0},
    {id: '4201', percent: 0.20, ceil: 233280.0},
    {id: '1140', percent: 0.07, ceil: 131640.0},
    {id: '1418', percent: 0.07, ceil: 131640.0},
    {id:   '43', percent: 0.14, ceil: 197400.0},
    {id:  '596', percent: 0.14, ceil: 197400.0},
    {id:  '347', percent: 0.14, ceil: 197400.0},
    {id:  '416', percent: 0.14, ceil: 197400.0},
    {id:  '843', percent: 0.14, ceil: 197400.0},
    {id:  '378', percent: 0.14, ceil: 197400.0},
    {id: '1184', percent: 0.14, ceil: 197400.0},
    {id: '1147', percent: 0.12, ceil: 167520.0},
    {id:  '792', percent: 0.07, ceil: 131640.0},
    {id: '4501', percent: 0.20, ceil: 233280.0},
    {id: '1246', percent: 0.14, ceil: 197400.0},
    {id: '2800', percent: 0.20, ceil: 233280.0},
    {id: '1260', percent: 0.07, ceil: 131640.0},
    {id:  '282', percent: 0.07, ceil: 131640.0},
    {id:  '614', percent: 0.12, ceil: 167520.0},
    {id:  '812', percent: 0.20, ceil: 233280.0},
    {id: '1045', percent: 0.14, ceil: 197400.0},

    {id:  '473', percent: 0.12, ceil: 167040.0},
    {id:  '483', percent: 0.12, ceil: 167040.0},
    {id: '1292', percent: 0.12, ceil: 167040.0},
    {id:  '485', percent: 0.12, ceil: 167040.0},
    {id:  '490', percent: 0.12, ceil: 167040.0},
    {id: '2034', percent: 0.12, ceil: 167040.0},
    {id: '6700', percent: 0.12, ceil: 167040.0},
    {id: '8900', percent: 0.12, ceil: 167040.0},
    {id: '1295', percent: 0.12, ceil: 167040.0},
    {id:  '502', percent: 0.12, ceil: 167040.0},
    {id:  '504', percent: 0.12, ceil: 167040.0},
    {id:  '507', percent: 0.12, ceil: 167040.0},
    {id:  '516', percent: 0.12, ceil: 167040.0},
    {id:  '517', percent: 0.12, ceil: 167040.0},
    {id:  '525', percent: 0.12, ceil: 167040.0},
    {id: '7500', percent: 0.12, ceil: 167040.0},
    {id: '7600', percent: 0.12, ceil: 167040.0},
    {id:  '531', percent: 0.12, ceil: 167040.0},
    {id:  '543', percent: 0.12, ceil: 167040.0},
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        flex: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveArea: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});

const Home = ({ navigation }) => { 

    const [taxPoints, setTaxPoints] = useState(0.0);
    const [salary, setSalary] = useState(0.0);
    const [salarySocial, setSalarySocial] = useState(0.0);
    const [valuation, setValuation] = useState(0.0);
    const [tax, setTax] = useState(0.0);
    const [btl, setBtl] = useState(0.0);
    const [health, setHealth] = useState(0.0);
    const [rewardsWork, setRewardsWork] = useState(0.0);
    const [rewardsWorker, setRewardsWorker] = useState(0.0);
    const [kerenWork, setKerenWork] = useState(0.0);
    const [kerenWorker, setKerenWorker] = useState(0.0);
    const [compensationWork, setCompensationWork] = useState(0.0);
    const [salaryNetto, setSalaryNetto] = useState(0.0);

    const calcTaxPoints = async () => {
        let result, result1, result2, result3;
        let index;
        let points = 0.0;
        let armyMonthes = 0;
        let gender = '';
        let familyStatus = '';

        result = await SecureStore.getItemAsync('isCitizen');
        if (result === 'true') {
            points+=2.25;
            armyMonthes = 23;
            result = await SecureStore.getItemAsync('gender');
            gender = result;
            if (result === 'woman') {
                points+=0.5;
                armyMonthes = 22;
            }
            result = await SecureStore.getItemAsync('birthDay');
            if (result) {
                if (yearsDiffFromNow(result) <= 18) {
                    points+=1.0;
                }
            }
            result = await SecureStore.getItemAsync('familyStatus');
            familyStatus = result;
            if (result === 'married') {
                result1 = await SecureStore.getItemAsync('spouseBirthDay');
                if (result1) {
                    if (yearsDiffFromNow(result1) <= 18) {
                        points+=1.0;
                    }
                }
            }
            result = await SecureStore.getItemAsync('degreeDate');
            if (result) {
                if (yearsDiffFromNow(result) <= 1) {
                    points+=1.0;
                }
            }
            result = await SecureStore.getItemAsync('armyStopDate');
            if (result) {
                if (yearsDiffFromNow(result) <= 3) {
                    result1 = await SecureStore.getItemAsync('armyStartDate');
                    result2 = await SecureStore.getItemAsync('armyStopDate');
                    if (result1 && result2) {
                        result3 = monthesDiff(result2, result1);
                        if (result3 >= 12) {
                            points+=1.0;
                        }
                        if (result3 >= armyMonthes) {
                            points+=1.0;
                        }
                    }
                }
            }
            result = await SecureStore.getItemAsync('immigrationDate');
            if (result) {
                result1 = yearsDiffFromNow(result);
                if (result1 <= 1) {
                    points+=0.25;
                } else if (result1 <= 2) {
                    points+=0.1666;
                } else if (result1 <= 3) {
                    points+=0.0833;
                }
            }
            index = 0;
            while (result = await SecureStore.getItemAsync(`childMyHold${index}`)) {
                result1 = yearsDiffFromNow(result);
                if (result1 === 0) {
                    points+=1.5;
                    if (familyStatus === 'widower') {
                        points+=1.5;
                    }
                } else if ((result1 >= 1) && (result1 <= 5)) {
                    points+=2.5;
                    if (familyStatus === 'widower') {
                        points+=2.5;
                    }
                } else if (result1 < 18) {
                    if (gender === 'woman') {
                        points+=1.0;
                    }
                    if (familyStatus === 'widower') {
                        points+=1.0;
                    }
                } else if (result1 === 18) {
                    if (gender === 'woman') {
                        points+=0.5;
                    }
                    if (familyStatus === 'widower') {
                        points+=0.5;
                    }
                }
                index+=1;
            }
            result = await SecureStore.getItemAsync('isChildrenFoods');
            if (result === 'true') {
                points+=1.0;
            } else {
                index = 0;
                while (result = await SecureStore.getItemAsync(`childNotMyHold${index}`)) {
                    result1 = yearsDiffFromNow(result);
                    if (result1 === 0) {
                        points+=1.5;
                    } else if ((result1 >= 1) && (result1 <= 5)) {
                        points+=2.5;
                    } else if ((result1 < 18) && (gender === 'woman')) {
                        points+=1.0;
                    } else if ((result1 === 18) && (gender === 'woman')) {
                        points+=0.5;
                    }
                    index+=1;
                }
            }
            result = await SecureStore.getItemAsync('isSpouseFoods');
            if (result === 'true') {
                points+=1.0;
            }

        } else {
            result = await SecureStore.getItemAsync('work');
            if (result === 'nurse') {
                points+=2.25;
            } else {
                points+=1.0;
            }
            result = await SecureStore.getItemAsync('gender');
            if (result === 'woman') {
                points+=0.5;
            }
        }

        setTaxPoints(points.toFixed(2));
    };

    const calcSalary = async () => {
        let result;
        let sum = 0.0;

        let salaryBasic = 0.0;
        let extraMonth = 0.0;
        let travel = 0.0;

        let hours100 = 0.0;
        let hours125 = 0.0;
        let hours150 = 0.0;
        let hours175 = 0.0;
        let hours200 = 0.0;

        let daysVacation = 0;

        let daysSick = 0;
        let daySick1 = 0.0;
        let daySick2 = 0.0;
        let daySick3 = 0.0;

        result = await SecureStore.getItemAsync('salary');
        if (result) {
            salaryBasic = parseFloat(result);
        }
        result = await SecureStore.getItemAsync('extraMonth');
        if (result) {
            extraMonth = parseFloat(result);
        }
        result = await SecureStore.getItemAsync('travel');
        if (result) {
            travel = parseFloat(result);
        }

        result = await SecureStore.getItemAsync('isMonthly');
        if (result === 'true') {
            sum+=salaryBasic;
            setSalarySocial(sum.toFixed(2));
            sum+=travel;
            sum+=extraMonth;
        } else {
            result = await SecureStore.getItemAsync('hours100');
            if (result) {
                hours100 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('hours125');
            if (result) {
                hours125 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('hours150');
            if (result) {
                hours150 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('hours175');
            if (result) {
                hours175 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('hours200');
            if (result) {
                hours200 = parseFloat(result);
            }

            result = await SecureStore.getItemAsync('daysVacation');
            if (result) {
                daysVacation = parseInt(result);
            }

            result = await SecureStore.getItemAsync('daysSick');
            if (result) {
                daysSick = parseInt(result);
            }
            result = await SecureStore.getItemAsync('daySick1');
            if (result) {
                daySick1 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('daySick2');
            if (result) {
                daySick2 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('daySick3');
            if (result) {
                daySick3 = parseFloat(result);
            }

            sum+=(salaryBasic*hours100);

            sum+=(salaryBasic*8.5*daysVacation);

            if (daysSick >= 1) {
                sum+=(salaryBasic*8.5*(daySick1/100));
            }
            daysSick-=1;
            if (daysSick >= 1) {
                sum+=(salaryBasic*8.5*(daySick2/100));
            }
            daysSick-=1;
            if (daysSick >= 1) {
                sum+=(salaryBasic*8.5*(daySick3/100));
            }
            daysSick-=1;
            if (daysSick >= 1) {
                sum+=(salaryBasic*8.5*daysSick);
            }

            setSalarySocial(sum.toFixed(2));

            sum+=(salaryBasic*1.25*hours125);
            sum+=(salaryBasic*1.5*hours150);
            sum+=(salaryBasic*1.75*hours175);
            sum+=(salaryBasic*2.0*hours200);

            sum+=travel;
            sum+=extraMonth;
        }

        setSalary(sum.toFixed(2));
    };

    const calcValuation = async () => {
        let result;
        let sum = 0.0;

        result = await SecureStore.getItemAsync('car');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('phone');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('food');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('insurance');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('present');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('otherValuation');
        if (result) {
            sum+=parseFloat(result);
        }

        setValuation(sum.toFixed(2));
    };

    const calcTax = async () => {
        let result;
        let salaryYear = (parseFloat(salary)+parseFloat(valuation))*12;
        let taxYear = 0.0;
        let taxMonth = 0.0;
        let rewardsYear = 0.0;
        let townDiscount = 0.0;
        let townDiscountCeil = 0.0;

        if (salaryYear > 75480.0) {
            taxYear+=75480.0*0.1;
            if (salaryYear > 108360.0) {
                taxYear+=(108360.0-75480.0)*0.14;
                if (salaryYear > 173880.0) {
                    taxYear+=(173880.0-108360.0)*0.2;
                    if (salaryYear > 241680.0) {
                        taxYear+=(241680.0-173880.0)*0.31;
                        if (salaryYear > 502920.0) {
                            taxYear+=(502920.0-241680.0)*0.35;
                            if (salaryYear > 647640.0) {
                                taxYear+=(647640.0-502920.0)*0.47;
                                taxYear+=(salaryYear-647640.0)*0.5;
                            } else {
                                taxYear+=(salaryYear-502920.0)*0.47;
                            }
                        } else {
                            taxYear+=(salaryYear-241680.0)*0.35;
                        }
                    } else {
                        taxYear+=(salaryYear-173880.0)*0.31;
                    }
                } else {
                    taxYear+=(salaryYear-108360.0)*0.2;
                }
            } else {
                taxYear+=(salaryYear-75480.0)*0.14;
            }
        } else {
            taxYear+=salaryYear*0.1;
        }

        result = await SecureStore.getItemAsync('rewardsWorker');
        if (result) {
            rewardsYear = salarySocial*(parseFloat(result)/100)*12*0.35;
        }

        result = await SecureStore.getItemAsync('isSpecialTown');
        if (result === 'true') {
            result = await SecureStore.getItemAsync('town');
            result = townTax.find(t => t.id === result);
            if (salaryYear > result.ceil) {
                townDiscountCeil = result.ceil;
            } else {
                townDiscountCeil = salaryYear;
            }
            townDiscount = townDiscountCeil*result.percent;
        }

        taxYear-=(taxPoints*2628.0+rewardsYear+townDiscount);
        
        taxMonth = taxYear/12;
        if (taxMonth < 0.0) {
            taxMonth = 0.0;     
        }

        setTax(taxMonth.toFixed(2));
    };

    const calcBtl = async () => {
        let result;
        let salaryMonth = parseFloat(salary)+parseFloat(valuation);
        let btlCalc = 0.0;

        result = await SecureStore.getItemAsync('isBtl');
        if (result === 'true') {
            if (salaryMonth > 6331.0) {
                btlCalc+=6331.0*0.004;
                btlCalc+=(salaryMonth-6331.0)*0.07;
            } else {
                btlCalc+=salaryMonth*0.004;
            }
        }

        setBtl(btlCalc.toFixed(2));
    };

    const calcHealth = async () => {
        let salaryMonth = parseFloat(salary)+parseFloat(valuation);
        let healthCalc = 0.0;

        result = await SecureStore.getItemAsync('isInsurance');
        if (result === 'true') {
            if (salaryMonth > 6331.0) {
                healthCalc+=6331.0*0.031;
                healthCalc+=(salaryMonth-6331.0)*0.05;
            } else {
                healthCalc+=salaryMonth*0.031;
            }
        }

        setHealth(healthCalc.toFixed(2));
    };

    const calcRewards = async () => {
        let result;
        let rewardsWorkCalc = 0.0;
        let rewardsWorkerCalc = 0.0;
        let percentWork = 0.0;
        let percentWorker = 0.0;

        result = await SecureStore.getItemAsync('rewardsWork');
        if (result) {
            percentWork = parseFloat(result);
        }
        result = await SecureStore.getItemAsync('rewardsWorker');
        if (result) {
            percentWorker = parseFloat(result);
        }

        rewardsWorkCalc = salarySocial*percentWork/100;
        rewardsWorkerCalc = salarySocial*percentWorker/100;

        setRewardsWork(rewardsWorkCalc.toFixed(2));
        setRewardsWorker(rewardsWorkerCalc.toFixed(2));
    };

    const calcKeren = async () => {
        let result;
        let kerenWorkCalc = 0.0;
        let kerenWorkerCalc = 0.0;
        let kerenCeil = 0.0;
        let percentWork = 0.0;
        let percentWorker = 0.0;
        let salaryForKeren = 0.0;

        result = await SecureStore.getItemAsync('kerenCeil');
        if (result) {
            kerenCeil = parseFloat(result);
        }
        result = await SecureStore.getItemAsync('kerenWork');
        if (result) {
            percentWork = parseFloat(result);
        }
        result = await SecureStore.getItemAsync('kerenWorker');
        if (result) {
            percentWorker = parseFloat(result);
        }

        if (kerenCeil > 0.0) {
            if (salarySocial > kerenCeil) {
                salaryForKeren = kerenCeil;    
            } else {
                salaryForKeren = salarySocial;    
            }
        } else {
            salaryForKeren = salarySocial;    
        }

        kerenWorkCalc = salaryForKeren*percentWork/100;
        kerenWorkerCalc = salaryForKeren*percentWorker/100;

        setKerenWork(kerenWorkCalc.toFixed(2));
        setKerenWorker(kerenWorkerCalc.toFixed(2));
    };

    const calcCompensation = async () => {
        let result;
        let compensationWorkCalc = 0.0;
        let percentWork = 0.0;

        result = await SecureStore.getItemAsync('compensationWork');
        if (result) {
            percentWork = parseFloat(result);
        }

        compensationWorkCalc = salarySocial*percentWork/100;

        setCompensationWork(compensationWorkCalc.toFixed(2));
    };

    const calcNetto = async () => {
        let result;
        let deduction = 0.0;
        let salaryCalc = 0.0;

        result = await SecureStore.getItemAsync('foodDeduction');
        if (result) {
            deduction+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('otherDeduction');
        if (result) {
            deduction+=parseFloat(result);
        }

        salaryCalc = parseFloat(salary)-parseFloat(tax)-parseFloat(btl)-parseFloat(health)-parseFloat(rewardsWorker)-parseFloat(kerenWorker)-deduction;
        setSalaryNetto(salaryCalc.toFixed(2));
    };

    useEffect(() => {
        calcTaxPoints();
        calcSalary();
        calcValuation();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTaxPoints(0.0);
            setSalarySocial(0.0);
            setSalary(0.0);
            setValuation(0.0);
            calcTaxPoints();
            calcSalary();
            calcValuation();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        calcTax();
    }, [taxPoints,salary,salarySocial,valuation]);
    useEffect(() => {
        calcBtl();
        calcHealth();
    }, [salary,valuation]);
    useEffect(() => {
        calcRewards();
        calcKeren();
        calcCompensation();
    }, [salarySocial]);
    useEffect(() => {
        calcNetto();
    }, [salary,tax,btl,health,rewardsWorker,kerenWorker]);

    const config = () => {
        navigation.navigate('Config');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <SafeAreaView style={styles.saveArea}>
                    <ScrollView>
                        <ConfigOutput value={taxPoints} text={i18n.t('taxPoints')} /> 
                        <ConfigOutput value={salary} text={i18n.t('salary')} /> 
                        <ConfigOutput value={valuation} text={i18n.t('valuation')} /> 
                        <ConfigOutput value={tax} text={i18n.t('tax')} /> 
                        <ConfigOutput value={btl} text={i18n.t('btl')} /> 
                        <ConfigOutput value={health} text={i18n.t('health')} /> 
                        <ConfigOutput value={rewardsWork} text={i18n.t('rewardsWork')} /> 
                        <ConfigOutput value={rewardsWorker} text={i18n.t('rewardsWorker')} /> 
                        <ConfigOutput value={kerenWork} text={i18n.t('kerenWork')} /> 
                        <ConfigOutput value={kerenWorker} text={i18n.t('kerenWorker')} /> 
                        <ConfigOutput value={compensationWork} text={i18n.t('compensationWork')} /> 
                        <ConfigOutput value={salaryNetto} text={i18n.t('salaryNetto')} /> 
                    </ScrollView>
                </SafeAreaView>
            </View>
            <View style={styles.bottomContainer}>
                <ConfigButton callback={config} title={i18n.t('configBtn')} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


export default Home;
