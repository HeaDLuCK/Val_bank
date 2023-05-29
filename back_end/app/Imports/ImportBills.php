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
        return new Bill([
            "company" => $row["company"],
            "pay_code" => $row["pay_code"],
            "amount" => $row["amount"],
            "date_of_bill" => Carbon::instance(Date::excelToDateTimeObject($row["date_of_bill"])),
            "payment_deadline" => Carbon::instance(Date::excelToDateTimeObject($row["payment_deadline"])),
        ]);
    }
}
