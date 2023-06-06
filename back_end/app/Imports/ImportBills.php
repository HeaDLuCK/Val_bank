<?php

namespace App\Imports;

use App\Models\Bill;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ImportBills implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $test = new Bill();
        $test->company = $row["company"];
        $test->pay_code = $row["pay_code"];
        $test->amount = $row["amount"];
        $test->date_of_bill = Carbon::instance(Date::excelToDateTimeObject($row["date_of_bill"]));
        $test->payment_deadline = Carbon::instance(Date::excelToDateTimeObject($row["payment_deadline"]));
        $test->save();
        return $test;
    }
}
